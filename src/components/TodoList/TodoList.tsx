import { useEffect, useState } from "react";
import "./TodoList.css";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoBar from "../TodoBar/TodoBar";
import TodoItem from "../TodoItem/TodoItem";
import { MetaResponse, Todo, TodoInfo } from "../../types";

const TodoList = () => {
  const url = "https://easydev.club/api/v2";
  const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: undefined,
    meta: { totalAmount: 0 },
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(url + "/todos?filter={status}", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result: MetaResponse<Todo, TodoInfo>) => {
        setTodos(result);
      });
  };

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

  const fetchPost = (todo: string) => {
    fetch(url + "/todos", {
      method: "POST",
      body: JSON.stringify({ title: todo, isDone: false }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTodos();
      });
  };

  const fetchDelete = (item: Todo) => {
    fetch(`${url}/todos/${item.id}`, { method: "DELETE" }).then(() => {
      fetchTodos();
    });
  };

  const fetchChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo
  ) => {
    const updatedIsDone = event.target.checked;
    fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: updatedIsDone }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTodos();
      });
  };

  const fetchEdit = (item: Todo, newTitle: string) => {
    fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTodos();
      });
  };

  return (
    <div className="todo-list">
      <TodoHeader fetchPost={fetchPost} />
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
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
