import React from "react";
import { connect } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (e) => {
    props.changeFilter(e);
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <span>Filter </span>
      <input type="text" onChange={handleChange} name="filterbar" />
    </div>
  );
};
const mapDispatchToProps = {
  changeFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
