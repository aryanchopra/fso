const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (
    !body.password ||
    body.password.length <= 3 ||
    !body.username ||
    body.username.length < 3
  ) {
    return response
      .status(401)
      .send({
        error: "username error",
      })
      .end();
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  });
  const savedUser = await newUser.save();
  response.json(savedUser);
});

module.exports = usersRouter;
