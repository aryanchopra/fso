import React from "react";
import { useState } from "react";
const CreateBlog = ({ createblogsubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createblogsubmit(newBlog);
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={blogSubmit}>
        <div>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit"> Create </button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
