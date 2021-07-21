const http = require("http");
const express = require("express");
const morgan = require("morgan");
const { response } = require("express");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("data", (req, res) => {
  if (req.method == "POST") {
    return [req.body.name, req.body.phone];
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello </h1>");
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => response.json(person))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(400).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(typeof Number(body.phone));
  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: "content missing 1",
    });
  }

  // const noteexists = Person.find({ name: body.name });

  // if (noteexists) {
  //   return response.status(400).json({
  //     error: "unique name",
  //   });
  // }

  const newPost = new Person({
    name: body.name,
    phone: Number(body.phone),
  });

  newPost.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const updatedperson = {
    name: body.name,
    phone: body.phone,
  };

  Person.findByIdAndUpdate(request.params.id, updatedperson, { new: true })
    .then((updatedperson) => {
      response.json(updatedperson);
    })
    .catch((err) => next(err));
});

app.get("/info", (request, response) => {
  currdate = new Date();
  response.write(`Phonebook has info for ${notes.length} people \n`);
  response.write(`${currdate}`);
  response.end();
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "Malformatted id",
    });
  }
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
