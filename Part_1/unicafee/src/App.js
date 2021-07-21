import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  let scores = new Array(7).fill(0);

  const [score, setScore] = useState(scores);
  const [maxscoreidx, setMaxscoreidx] = useState(0);
  console.log(scores);
  return (
    <>
      <div>{anecdotes[selected]} </div>
      <span>Votes: {score[selected]}</span>
      <div>
        <button
          onClick={() => {
            const copy = [...score];
            copy[selected] += 1;
            setScore(copy);
            const maxindex = copy.indexOf(Math.max(...copy));
            setMaxscoreidx(maxindex);
          }}
        >
          Vote
        </button>
        <button
          onClick={() => {
            setSelected(randomNumber(0, 7));
          }}
        >
          Change Anecdote {selected}
        </button>
      </div>
      <h1>Maximum Votes for Anecdote index: {score[maxscoreidx]}</h1>
      <span>{anecdotes[maxscoreidx]}</span>
    </>
  );
};

export default App;
