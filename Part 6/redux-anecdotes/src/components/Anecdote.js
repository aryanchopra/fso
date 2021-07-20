import React from "react";
import { useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  newNotification,
  removeNotification,
} from "../reducers/notificationReducer";
const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = async (anecdote) => {
    await dispatch(voteFor(anecdote));
    dispatch(newNotification(`You voted '${anecdote.content}'`, 5000));
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
