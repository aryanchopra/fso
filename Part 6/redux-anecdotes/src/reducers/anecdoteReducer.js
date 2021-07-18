const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    content,
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const anecdote = state.find((item) => item.id === action.id);
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
      console.log(newanecdote);
      return state.concat(newanecdote);
    default:
      return state;
  }
};

export default anecdoteReducer;
