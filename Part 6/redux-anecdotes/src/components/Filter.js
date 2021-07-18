import React from "react";
import { useDispatch } from "react-redux";
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_FILTER",
      filter: e.target.value,
    });
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <span>Filter </span>
      <input type="text" onChange={handleChange} name="filterbar" />
    </div>
  );
};

export default Filter;
