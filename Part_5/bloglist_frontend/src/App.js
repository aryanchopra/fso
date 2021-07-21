import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
const App = () => {
  const [notificationmsg, setNotificationmsg] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((first, second) => {
        return second.likes - first.likes;
      });
      console.log("blogs sorted:", blogs);
      setBlogs(blogs);
    });
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
      setNotificationmsg(`${user.name} now logged in `);
      setTimeout(() => {
        setNotificationmsg(null);
      }, 5000);
      blogService.setToken(user.token);
      console.log("Blog service token set ", blogService.token);
    } catch (exception) {
      setNotificationmsg(exception.response.data.error);
      setTimeout(() => {
        setNotificationmsg(null);
      }, 5000);
    }
  };
  const createBlogSubmit = async (newBlog) => {
    try {
      const newblog = await blogService.create(newBlog);
      setNotificationmsg(
        `Created new blog titled ${newblog.title} by ${newblog.author}`
      );
      setTimeout(() => {
        setNotificationmsg(null);
      }, 5000);
      setBlogs(blogs.concat(newblog));
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
  const likeHandler = async (blogObj) => {
    const newBlog = await blogService.update(blogObj, blogObj.id);
    setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)));
  };

  const deleteHandler = async (id) => {
    const response = await blogService.deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };
  if (!user) {
    return (
      <>
        <h2>Login</h2>
        <Notification notificationmsg={notificationmsg} />
        {loginForm()}
      </>
    );
  } else {
    return (
      <>
        <div>
          Welcome, {user.username} <button onClick={logout}>Logout</button>
        </div>
        <Notification notificationmsg={notificationmsg} />
        <Togglable buttonLabel="Create Blog">
          <CreateBlog createblogsubmit={createBlogSubmit} />
        </Togglable>

        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              likeHandler={likeHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </>
    );
  }
};

export default App;
