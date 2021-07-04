const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const { morganmiddleware } = require("./utils/middleware");
const blogRouter = require("./controllers/blog");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morganmiddleware);
app.use("/api/blogs", blogRouter);
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
