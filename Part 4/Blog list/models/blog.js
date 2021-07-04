const mongoose = require("mongoose");
const config = require("./utils/config");
const mongoUrl = `mongodb+srv://aryanchopra26:${config.PASSWORD}@cluster0.bmpmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);
