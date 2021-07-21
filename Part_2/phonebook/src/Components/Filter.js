import React from "react";

const Filter = (props) => {
  return (
    <input
      value={props.search}
      onChange={(event) => {
        props.setSearch(event.target.value);
      }}
    />
  );
};

export default Filter;
