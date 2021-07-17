const express = require("express");
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const {
  morganmiddleware,
  tokenExtractor,
  userExtractor,
  errorHandler,
} = require("./utils/middleware");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morganmiddleware);
app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);
module.exports = app;
