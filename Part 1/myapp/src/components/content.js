import React from "react";

const Content = ({ parts }) => {
  const itemlist = parts.map((item) => {
    return (
      <p>
        {item.name} {item.exercises}
      </p>
    );
  });
  return <div>{itemlist}</div>;
};

export default Content;
