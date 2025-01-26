import { Todo } from "../TodoList/TodoList";
import React, { useState } from "react";
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    if (isEditMode) {
      fetchEdit(item, newTitle);
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <li className="todo-item">
      <InputIsDone fetchChecked={fetchChecked} item={item} />
      <input
        className="todo-item-title"
        type="text"
        value={isEditMode ? newTitle : item.title}
        disabled={!isEditMode}
        onChange={handleTitleChange}
      />
      <div className="container">
        <BtnEdit handleEditTitle={handleEditTitle} isEditMode={isEditMode} />
        <BtnDelete fetchDelete={fetchDelete} item={item} />
      </div>
    </li>
  );
};

export default TodoItem;
