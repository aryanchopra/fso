import React, { useState } from "react";

const Blog = ({ blog, likeHandler, user, deleteHandler }) => {
  const [visible, setVisible] = useState(false);
  const showwhenVisible = { display: visible ? "" : "none" };
  const likehandler = (blog) => {
    const newObj = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      id: blog.id,
    };
    likeHandler(newObj);
  };
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this blog?")) {
      deleteHandler(id);
    }
  };

  const userOwned = blog.user.toString() === user.id.toString();

  return (
    <div>
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <div style={showwhenVisible}>URL : {blog.url}</div>
      <div style={showwhenVisible}>
        Likes : {blog.likes}{" "}
        <button onClick={() => likehandler(blog)}>Like</button>
      </div>
      {userOwned ? (
        <div style={showwhenVisible}>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Blog;
