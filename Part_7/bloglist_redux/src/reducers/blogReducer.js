import blogService from "../services/blogs";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const CreateNewBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    dispatch({
      type: "NEW_BLOG",
      data: blog,
    });
  };
};

export const LikeBlog = (blog) => {
  return async (dispatch) => {
    const newObj = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      id: blog.id,
    };
    const newBlog = await blogService.update(newObj, blog.id);
    dispatch({
      type: "LIKE_BLOG",
      data: newBlog,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "NEW_BLOG":
      return state.concat(action.data);

    case "LIKE_BLOG":
      console.log(action);
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );

    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

export default blogReducer;
