import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const addNewAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.newanecdote.value));
  };
  const dispatch = useDispatch();

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
export default AnecdoteForm;
