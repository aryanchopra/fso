import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
});
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
