import React from "react";
import { useState } from "react";
const Togglable = (props) => {
  const [visible, setVisible] = useState(true);
  const hidewhenVisible = { display: visible ? "none" : "" };
  const showwhenVisible = { display: visible ? "" : "none" };
  return (
    <div>
      <div style={hidewhenVisible}>
        <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>

      <div style={showwhenVisible}>
        {props.children}
        <div>
          <button onClick={() => setVisible(false)}> Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default Togglable;
