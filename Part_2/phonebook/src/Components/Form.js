import React from "react";

const Form = ({
  newName,
  newNumber,
  onFormSubmit,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        Name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        Number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
