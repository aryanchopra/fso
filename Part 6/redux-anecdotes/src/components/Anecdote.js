import React from "react";
import { useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import {
  newNotification,
  removeNotification,
} from "../reducers/notificationReducer";
const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteFor(id));
    dispatch(newNotification(`You voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
