import React from "react";

const Form = ({ onFormSubmit, onChangeText, todoItem }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={todoItem}
        onChange={onChangeText}
      />
      <button className="button-class"> Add</button>
    </form>
  );
};

export default Form;
