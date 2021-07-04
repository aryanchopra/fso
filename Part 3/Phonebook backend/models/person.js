require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODBURI;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB"));

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phoneSchema);

// if (process.argv.length === 3) {
//   Person.find({}).then((person) => {
//     person.forEach((person) => console.log(person));
//     mongoose.connection.close();
//   });
// }

// if (process.argv.length === 5) {
//   const person = new Person({
//     name: process.argv[3],
//     phone: process.argv[4],
//   });
//   person.save().then((result) => {
//     console.log(result);
//     console.log(`added ${result.name} saved to phonebook`);
//     mongoose.connection.close();
//   });
// }
