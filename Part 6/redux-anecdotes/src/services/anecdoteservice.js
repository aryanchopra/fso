import axios from "axios";

import { getId } from "../reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newAnecdote = async (content) => {
  const newAnecdoteobj = {
    content,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdoteobj);
  return response.data;
};

const update = (id, newObject) => {
  return axios.put(baseUrl + "/" + id, newObject);
};

export default { getAll, newAnecdote, update };
