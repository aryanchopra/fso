import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((s, p) => {
    console.log(s, p);
    return s + p.exercises;
  }, 0);
  console.log(sum);
  return <span>Total number of exercises: {sum}</span>;
};

const Content = ({ course }) => {
  const itemlist = course.parts.map((item) => {
    return (
      <div key={item.id}>
        {item.name} {item.exercises}
      </div>
    );
  });
  return <div>{itemlist}</div>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
