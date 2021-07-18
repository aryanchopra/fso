import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";
const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((first, second) => second.votes - first.votes)
  );
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} />
      ))}
    </div>
  );
};

export default Anecdotes;
