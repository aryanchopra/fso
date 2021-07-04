const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Enter password!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://aryanchopra26:${password}@cluster0.bmpmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

const Person = new mongoose.model("Person", phoneSchema);

if (process.argv.length === 3) {
  Person.find({}).then((person) => {
    person.forEach((person) => console.log(person));
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  });
  person.save().then((result) => {
    console.log(result);
    console.log(`added ${result.name} saved to phonebook`);
    mongoose.connection.close();
  });
}
