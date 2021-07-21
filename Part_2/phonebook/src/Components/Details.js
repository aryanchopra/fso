import React from "react";
const Details = ({ resultsToShow, deletePerson }) => {
  return resultsToShow.map((person, idx) => {
    return (
      <li key={idx}>
        {person.name} : {person.phone}{" "}
        <button onClick={() => deletePerson(person)}>Delete</button>
      </li>
    );
  });
};
export default Details;
