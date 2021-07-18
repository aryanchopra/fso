import React from "react";
import { useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
