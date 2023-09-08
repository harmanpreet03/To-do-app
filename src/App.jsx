import React, { useState, useEffect } from "react";
import Form from "./components/form";
import DoList from "./components/DoList";
import { Link, useLoaderData } from "react-router-dom";

const App = () => {
  const [todoItem, setToDoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [day, setDay] = useState("today");
  const [editingItemId, setEditingItemId] = useState(null); 
  const [editedText, setEditedText] = useState(""); 

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8085/${day}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTodoList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [day]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const newItem = { item: todoItem };

    try {
      const response = await fetch(`http://localhost:8085/${day}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const newItemData = await response.json();
      setTodoList([...todoList, newItemData]);
    } catch (error) {
      console.error(error);
    }
  };

 
  const onChangeText = (e) => setToDoItem(e.target.value);

  
  const onDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8085/${day}/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const updatedTodoList = todoList.filter((item) => item.id !== itemId);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error(error);
    }
  };


  const onUpdateItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8085/${day}/${itemId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ item: editedText }), 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      
      fetchData();

      
      setEditingItemId(null);
      setEditedText("");
    } catch (error) {
      console.error(error);
    }
  };

  
  const onEditClick = (itemId, itemText) => {
    setEditingItemId(itemId);
    setEditedText(itemText);
  };

  return (
    <div className="container">
      <h1 className="todo-app">To-Do List !!</h1>
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
      <DoList
        todoList={todoList}
        onDeleteItem={onDeleteItem}
        onEditClick={onEditClick}
        editingItemId={editingItemId}
        editedText={editedText}
        setEditedText={setEditedText}
        onUpdateItem={onUpdateItem}
      />
    </div>
  );
};

export default App;
