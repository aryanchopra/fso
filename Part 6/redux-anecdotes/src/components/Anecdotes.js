import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Anecdote from "./Anecdote";
import { voteFor } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";
const Anecdotes = (props) => {
  // const dispatch = useDispatch();
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes
  //     .filter((anecdote) =>
  //       anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  //     )
  //     .sort((first, second) => second.votes - first.votes)
  // );
  const vote = async (anecdote) => {
    await props.voteFor(anecdote);
    props.newNotification(`You voted '${anecdote.content}'`, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map((anecdote, idx) => (
        <Anecdote key={idx} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((first, second) => second.votes - first.votes),
  };
};

const mapDispatchToProps = {
  voteFor,
  newNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes);

export default ConnectedAnecdotes;
