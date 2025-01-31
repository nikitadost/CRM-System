import { useEffect, useState } from "react";
import "./TodoList.css";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoBar from "../TodoBar/TodoBar";
import TodoItem from "../TodoItem/TodoItem";
import { MetaResponse, Todo, TodoInfo } from "../../types";
import {
  fetchTodos,
  fetchDelete,
  fetchPost,
  fetchEdit,
  fetchChecked,
} from "../../api/TodoApi";

const TodoList = () => {
  const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: undefined,
    meta: { totalAmount: 0 },
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos.data;
      case "inWork":
        return todos.data.filter((todo) => !todo.isDone);
      case "completed":
        return todos.data.filter((todo) => todo.isDone);
      default:
        return todos.data;
    }
  };

  return (
    <div className="todo-list">
      <TodoHeader fetchPost={fetchPost} setTodos={setTodos} />
      <TodoBar currentFilter={filter} todos={todos} setFilter={setFilter} />
      <div className="todos-wrap">
        <ul className="todo-items">
          {todos &&
            todos.data &&
            filteredTodos().map((item: Todo) => (
              <TodoItem
                key={item.id}
                item={item}
                fetchChecked={fetchChecked}
                fetchDelete={fetchDelete}
                fetchEdit={fetchEdit}
                setTodos={setTodos}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
