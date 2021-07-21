import React, { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Details from "./Components/Details";
import axios from "axios";
import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const resultsToShow = search
    ? persons.filter((person) => person.name.toLowerCase().includes(search))
    : persons;

  const onFormSubmit = (event) => {
    event.preventDefault();
    let enteredDetails = { name: newName, phone: newNumber };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} already exists in the database! Do you want to update their phone number>`
        )
      ) {
        const persontoupdate = persons.find(
          (person) => person.name === newName
        );
        personService.update(persontoupdate.id, enteredDetails).then((res) => {
          setPersons(
            persons.map((person) =>
              person.id === persontoupdate.id ? res.data : person
            )
          );
        });
      }
    } else {
      personService
        .create(enteredDetails)
        .then((res) => setPersons(persons.concat(res.data)));
      setNewName("");
      setNewNumber("");
    }
  };
  const deletePerson = (human) => {
    if (window.confirm(`Do you want to delete ${human.name}'s number?`)) {
      personService.deletePerson(human.id).then((res) => {
        const newpersons = persons.filter((person) => person.id !== human.id);
        setPersons(newpersons);
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      Search : <Filter search={search} setSearch={setSearch} />
      <Form
        onFormSubmit={onFormSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Details resultsToShow={resultsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
