import React, { useState } from "react";
import { Todo } from "../../types";
import BtnDelete from "../../UI/BtnDelete/BtnDelete";
import InputIsDone from "../../UI/InputIsDone/InputIsDone";
import BtnEdit from "../../UI/BtnEdit/BtnEdit";

interface TodoItemProps {
  key: number;
  item: Todo;
  fetchChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo
  ) => void;
  fetchDelete: (item: Todo) => void;
  fetchEdit: (item: Todo, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  fetchChecked,
  fetchDelete,
  fetchEdit,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [error, setError] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    if (isEditMode) {
      if (newTitle.length < 2 || newTitle.length > 64) {
        setError("Task title should be between 2 and 64 characters.");
        return;
      }
      fetchEdit(item, newTitle);
      setError("");
    }
    setIsEditMode(!isEditMode);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNewTitle(item.title);
    setError("");
  };

  return (
    <li className="todo-item">
      <InputIsDone fetchChecked={fetchChecked} item={item} />
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
        <BtnEdit
          handleCancelEdit={handleCancelEdit}
          handleEditTitle={handleEditTitle}
          isEditMode={isEditMode}
        />

        <BtnDelete fetchDelete={fetchDelete} item={item} />
      </div>
    </li>
  );
};

export default TodoItem;
