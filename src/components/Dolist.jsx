import React from "react";
import Onecard from "./Onecard";

const DoList = ({
  todoList,
  onDeleteItem,
  onEditClick,
  editingItemId,
  editedText,
  setEditedText,
  onUpdateItem,
}) => {
  return (
    <div className="task-container">
      <ul className="Onecard">
        {todoList.map((item) => (
          <Onecard key={item.id}>
            {item.id === editingItemId ? (
              // Display the input field for editing
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => onUpdateItem(item.id)}>Save</button>
              </div>
            ) : (
              <div>
                <span>{item.item}</span>
                <button onClick={() => onEditClick(item.id, item.item)}>
                  Edit
                </button>
                <button onClick={() => onDeleteItem(item.id)}>Delete</button>
              </div>
            )}
          </Onecard>
        ))}
      </ul>
    </div>
  );
};

export default DoList;
