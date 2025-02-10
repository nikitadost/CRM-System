import React, { useState } from "react";
import { Todo, TodoStatus } from "../../types/types";
import DeleteIcon from "../UI/Icons/DeleteIcon";
import SaveIcon from "../UI/Icons/SaveIcon";
import EditIcon from "../UI/Icons/EditIcon";
import CancelIcon from "../UI/Icons/CancelIcon";
import { fetchDelete, fetchEdit, fetchChecked } from "../../api/TodoApi";

interface TodoItemProps {
  handleFetch: (status: TodoStatus) => void;
  key: number;
  item: Todo;
  filter: TodoStatus;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, handleFetch, filter }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [error, setError] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = async () => {
    if (isEditMode) {
      if (newTitle.length < 2 || newTitle.length > 64) {
        setError("Task title should be between 2 and 64 characters.");
        return;
      }
      await fetchEdit(item.id, newTitle);
      await handleFetch(filter);
      setError("");
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNewTitle(item.title);
    setError("");
  };

  const handleDelete = async () => {
    await fetchDelete(item.id);
    await handleFetch(filter);
  };

  const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await fetchChecked(event, item.id);
    await handleFetch(filter);
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
          <button className="edit-btn" onClick={handleEditTitle}>
            {isEditMode ? <SaveIcon /> : <EditIcon />}
          </button>
          {isEditMode ? (
            <div className="cancel-btn" onClick={handleCancelEdit}>
              <CancelIcon />
            </div>
          ) : null}
        </div>

        <div className="delete-btn" onClick={handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
