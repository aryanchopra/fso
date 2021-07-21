const initialState = "";

export const changeFilter = (e) => {
  return {
    type: "CHANGE_FILTER",
    filter: e.target.value,
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return action.filter;

    default:
      return state;
  }
};

export default filterReducer;
