import React, { useState } from "react";
import { Todo, SetTodos } from "../../types/types";
import BtnDelete from "../UI/BtnDelete/BtnDelete";
import InputIsDone from "../UI/InputIsDone/InputIsDone";
import BtnEdit from "../UI/BtnEdit/BtnEdit";

interface TodoItemProps {
  key: number;
  item: Todo;
  fetchChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo,
    setTodos: SetTodos
  ) => void;
  fetchDelete: (item: Todo, setTodos: SetTodos) => void;
  fetchEdit: (item: Todo, newTitle: string, setTodos: SetTodos) => void;
  setTodos: SetTodos;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  fetchChecked,
  fetchDelete,
  fetchEdit,
  setTodos,
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
      fetchEdit(item, newTitle, setTodos);
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
      <InputIsDone
        fetchChecked={fetchChecked}
        item={item}
        setTodos={setTodos}
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
        <BtnEdit
          handleCancelEdit={handleCancelEdit}
          handleEditTitle={handleEditTitle}
          isEditMode={isEditMode}
        />

        <BtnDelete fetchDelete={fetchDelete} item={item} setTodos={setTodos} />
      </div>
    </li>
  );
};

export default TodoItem;
