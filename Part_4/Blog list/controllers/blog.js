const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.author) {
    return response.status(400).end();
  }

  if (!request.user) {
    return response.status(401).json({ err: "token invalid" });
  }
  const user1 = request.user;

  request.body.user = user1.id;

  const blog = new Blog(request.body);

  const blogpromise = await blog.save();

  user1.blogs = user1.blogs.concat(blogpromise._id);

  await user1.save();

  return response.status(201).json(blogpromise);
});
blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  console.log(request.user);
  if (!request.user) {
    return response.status(401).json({ err: "token invalid" });
  }
  const id = request.params.id;
  const blogobj = await Blog.findById(id);
  if (!blogobj) {
    response.status(404).end();
  }
  if (blogobj.user.toString() === request.user.id) {
    const result = await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    response.status(403).json({
      error: "Blog does not belong to user",
    });
  }
});

blogRouter.put("/:id", userExtractor, async (request, response, next) => {
  const body = request.body;
  console.log("printing received body", body);
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
