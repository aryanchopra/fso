const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.author) {
    return response.status(400).end();
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ err: "token invalid" });
  }
  const user1 = await User.findById(decodedToken.id);
  request.body.user = user1.id;
  const blog = new Blog(request.body);
  const blogpromise = await blog.save();
  user1.blogs = user1.blogs.concat(blogpromise._id);
  await user1.save();
  return response.status(201).json(blogpromise);
});
blogRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ err: "token invalid" });
  }
  const userId = await User.findById(decodedToken.id);
  const id = request.params.id;
  const blogobj = await Blog.findById(id);
  console.log(typeof blogobj.user);
  console.log(userId);
  if (blogobj.user.toString() === userId.id.toString()) {
    Blog.findByIdAndRemove(id)
      .then((result) => response.status(204).end())
      .catch((err) => next(err));
  } else {
    response.status(403).json({
      error: "Blog does not belong to user",
    });
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  console.log(body.likes);
  const updatedblog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  };
  const updatedblog1 = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedblog,
    { new: true }
  );
  response.json(updatedblog1);
});
module.exports = blogRouter;
