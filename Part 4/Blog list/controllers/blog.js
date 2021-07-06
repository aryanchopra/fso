const blogRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.author) {
    return response.status(400).end();
  }
  const blog = new Blog(request.body);
  const blogpromise = await blog.save();
  return response.status(201).json(blogpromise);
});
blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  Blog.findByIdAndRemove(id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
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
