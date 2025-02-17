import React, { useState } from "react";
import { Todo } from "../../types/types";
import DeleteIcon from "../UI/Icons/DeleteIcon";
import SaveIcon from "../UI/Icons/SaveIcon";
import EditIcon from "../UI/Icons/EditIcon";
import CancelIcon from "../UI/Icons/CancelIcon";
import { fetchDelete, fetchEdit, fetchChecked } from "../../api/TodoApi";

interface TodoItemProps {
  handleFetch: () => void;
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, handleFetch }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [error, setError] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    setIsEditMode(true);
  };

  const handleSaveTitle = async () => {
    if (newTitle.length < 2 || newTitle.length > 64) {
      setError("Task title should be between 2 and 64 characters.");
      return;
    }
    await fetchEdit(item.id, newTitle);
    await handleFetch();
    setError("");
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNewTitle(item.title);
    setError("");
  };

  const handleDelete = async () => {
    await fetchDelete(item.id);
    await handleFetch();
  };

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await fetchChecked(event, item.id);
    await handleFetch();
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={(event) => {
          handleCheck(event);
        }}
      />
      <div className="relative-container">
        <textarea
          className="todo-item-title"
          value={isEditMode ? newTitle : item.title}
          disabled={!isEditMode}
          onChange={handleTitleChange}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div className="btns-container">
        <div className="edit-btns">
          {!isEditMode && (
            <button className="edit-btn" onClick={handleEditTitle}>
              <EditIcon />
            </button>
          )}
          {isEditMode && (
            <button className="edit-btn" onClick={handleSaveTitle}>
              <SaveIcon />
            </button>
          )}
          {isEditMode && (
            <div className="cancel-btn" onClick={handleCancelEdit}>
              <CancelIcon />
            </div>
          )}
        </div>

        <div className="delete-btn" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
