import React from "react";
import Onecard from "./Onecard";

const DoList = ({ todoList }) => {
  return (
    <div className="task-container">
      <ul className="Onecard">
        {todoList.map((item, index) => (
          <Onecard key={index}>{item.item}</Onecard>
        ))}
      </ul>
    </div>
  );
};

export default DoList;
