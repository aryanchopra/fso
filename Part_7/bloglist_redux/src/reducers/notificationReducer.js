export const newNotification = (message) => {
  return {
    type: "NEW_NOTIFICATION",
    message: message,
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.message;
    default:
      return state;
  }
};

export default notificationReducer;
