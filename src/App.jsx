import React, { useState, useEffect } from "react";
import Form from "./components/form";
import DoList from "./components/DoList";
import { Link, useLoaderData } from "react-router-dom";

const App = () => {
  const [todoItem, setToDoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [day, setDay] = useState("today");

  useEffect(() => {
    fetch(`http://localhost:8085/${day}`)
      .then((response) => response.json())
      .then((data) => {
        setTodoList(data);
      });
  }, [day]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item: todoItem,
    };
    fetch(`http://localhost:8085/${day}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((todoItem) => setTodoList([...todoList, todoItem]));
  };

  const onChangeText = (e) => setToDoItem(e.target.value);

  return (
    <div className="container">
      <h1 className="todo-app">To-Do List</h1>
      <div className="link-div">
        <Link to={"/yesterday"}>Yesterday</Link>
        <Link to={"/today"}>Today</Link>
        <Link to={"/tomorrow"}>Tomorrow</Link>
      </div>
      <Form
        onFormSubmit={onFormSubmit}
        onChangeText={onChangeText}
        todoItem={todoItem}
      />
      <DoList todoList={todoList} />
    </div>
  );
};

export default App;
