import React, { useState, useEffect } from "react";
import "./styles.css";

const Choice = ({
  answer,
  tr,
  selected,
  selector,
  clicked,
  answers,
  addAnswer
}) => {
  const [color, setColor] = useState("");
  useEffect(
    () =>
      selected
        ? tr
          ? setColor("LightGreen")
          : setColor("LightPink")
        : setColor(""),
    [color, selected, tr]
  );
  return (
    <div
      className="choice"
      style={{ backgroundColor: color }}
      onClick={() => {
        selector(true, tr);
        clicked();
        addAnswer([...answers, answer]);
      }}
    >
      {answer}
    </div>
  );
};

export default Choice;
