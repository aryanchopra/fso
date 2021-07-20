export const newNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_NOTIFICATION", message });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, timer);
  };
};

// export const removeNotification = () => {
//   return {
//     type: "REMOVE_NOTIFICATION",
//   };
// };

const notificationReducer = (state = "Sample notification", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.message;

    case "REMOVE_NOTIFICATION":
      return "";

    default:
      return state;
  }
};

export default notificationReducer;
