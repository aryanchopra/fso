const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "Random title 1",
    url: "Random url 1",
    author: "Random author 1",
    likes: 20,
  },
  {
    title: "Random title 2",
    url: "Random url 2",
    author: "Random author 2",
    likes: 21,
  },
  {
    title: "Random title 3",
    url: "Random url 3",
    author: "Random author 3",
    likes: 22,
  },
  {
    title: "Random title 4",
    url: "Random url 4",
    author: "Random author 4",
    likes: 23,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Deleted");
  blogsobject = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsobject.map((blog) => blog.save());
  await Promise.all(promiseArray);
  console.log("saved all");
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/).expect;
});

test("blog length initially is 0", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});
test("id exists", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body[0].id).toBeDefined();
});

test("new note is created", async () => {
  const newBlog = {
    title: "Random title 5",
    url: "Random url 5",
    author: "Random author 5",
    likes: 233,
  };
  await api.post("/api/blogs").send(newBlog);
  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test("if no likes posted, then default to 0", async () => {
  const newBlog = {
    title: "Random title 6",
    url: "Random url 6",
    author: "Random author 6",
  };
  const responseblog = await api.post("/api/blogs").send(newBlog);
  console.log(responseblog.body);
  expect(responseblog.body.likes).toBe(0);
});

test("if no title, body then 400", async () => {
  const newBlog = {
    author: "Random author 6",
  };

  const responseblog = await api.post("/api/blogs").send(newBlog).expect(400);
  console.log(responseblog.status);
});

afterAll(() => {
  mongoose.connection.close();
});
