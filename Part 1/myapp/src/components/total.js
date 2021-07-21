import React from "react";

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  console.log(sum);
  return <span>Total number of exercises: {sum}</span>;
};

export default Total;
