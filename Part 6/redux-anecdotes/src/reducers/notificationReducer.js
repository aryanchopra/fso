let prevtimer = null;

export const newNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_NOTIFICATION", message });
    const timeoutID = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, timer);
    prevtimer = timeoutID;
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
      if (prevtimer) clearTimeout(prevtimer);
      return action.message;

    case "REMOVE_NOTIFICATION":
      return "";

    default:
      return state;
  }
};

export default notificationReducer;
