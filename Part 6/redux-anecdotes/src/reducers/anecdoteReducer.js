// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];
import anecdoteservice from "../services/anecdoteservice";
export const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return async (dispatch) => {
    await anecdoteservice.newAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      content,
    });
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1,
    };
    await anecdoteservice.update(updatedAnecdote.id, updatedAnecdote);
    dispatch({
      type: "VOTE",
      anecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteservice.getAll();
    dispatch({
      type: "INIT_ANECDOTE",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const anecdote = action.anecdote;
      anecdote.votes = anecdote.votes + 1;
      const newState = state.map((item) =>
        item.id === action.id ? anecdote : item
      );
      return newState;

    case "NEW_ANECDOTE":
      const newanecdote = {
        content: action.content,
        id: getId(),
        votes: 0,
      };

      return state.concat(newanecdote);

    case "INIT_ANECDOTE":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
