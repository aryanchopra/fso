const totallikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const likes = blogs.map((blog) => blog.likes);
  const reducer = (likes, val) => likes + val;
  return likes.reduce(reducer, 0);
};

const favblog = (blogs) => {
  const reducer = (prev, curr) => {
    console.log("acc: ", prev, " curr: ", curr);
    return prev.likes > curr.likes ? prev : curr;
  };
  const blogfav = blogs.reduce(reducer, 0);

  return blogfav;
};
module.exports = {
  totallikes,
  favblog,
};
