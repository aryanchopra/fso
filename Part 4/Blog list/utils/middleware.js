const morgan = require("morgan");

morgan.token("data", (req, res) => {
  if (req.method == "POST") {
    return [req.body.title, req.body.author];
  }
});

const morganmiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms :data"
);

module.exports = {
  morganmiddleware,
};
