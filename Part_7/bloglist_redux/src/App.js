import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "./reducers/notificationReducer";
import { initBlogs, CreateNewBlog } from "./reducers/blogReducer";
const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const storedblogs = useSelector((state) => {
    return state.blogs.sort((first, second) => {
      return second.likes - first.likes;
    });
  });

  useEffect(() => {
    dispatch(initBlogs());

    const saveduser = window.localStorage.getItem("loggedinUser");
    const saveduser1 = JSON.parse(saveduser);
    if (saveduser1) {
      setUser(saveduser1);
      blogService.setToken(saveduser1.token);
      console.log("BLog service token set", blogService.token);
    }
  }, []);
  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };
  const loginSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      dispatch(newNotification(`${user.name} now logged in `));
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
      blogService.setToken(user.token);
      console.log("Blog service token set ", blogService.token);
    } catch (exception) {
      dispatch(newNotification(exception.response.data.error));
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
    }
  };
  const createBlogSubmit = async (newBlog) => {
    try {
      dispatch(CreateNewBlog(newBlog));
      dispatch(
        newNotification(
          `Created new blog titled ${newBlog.title} by ${newBlog.author}`
        )
      );
      setTimeout(() => {
        dispatch(newNotification(null));
      }, 5000);
    } catch (exception) {
      console.log(exception);
    }
  };
  const loginForm = () => {
    return (
      <Togglable buttonLabel="Log in">
        <LoginForm
          loginSubmit={loginSubmit}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Togglable>
    );
  };
  if (!user) {
    return (
      <>
        <h2>Login</h2>
        <Notification />
        {loginForm()}
      </>
    );
  } else {
    return (
      <>
        <div>
          Welcome, {user.username} <button onClick={logout}>Logout</button>
        </div>
        <Notification />
        <Togglable buttonLabel="Create Blog">
          <CreateBlog createblogsubmit={createBlogSubmit} />
        </Togglable>

        <div>
          <h2>blogs</h2>
          {storedblogs.map((blog) => (
            <Blog key={blog.id} user={user} blog={blog} />
          ))}
        </div>
      </>
    );
  }
};

export default App;
