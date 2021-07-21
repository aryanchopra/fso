import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = (props) => {
  const addNewAnecdote = (e) => {
    e.preventDefault();
    props.createAnecdote(e.target.newanecdote.value);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="newanecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
