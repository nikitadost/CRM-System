import { useEffect, useState } from "react";
import "./TodoListPage.css";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListSwitches from "../../components/ListSwitches/ListSwitches";
import { MetaResponse, Todo, TodoInfo } from "../../types/types";
import { fetchTodos, fetchPost } from "../../api/TodoApi";
import TodoList from "../../components/TodoList/TodoList";

const TodoListPage = () => {
  const [todos, setTodos] = useState<MetaResponse<Todo, TodoInfo>>({
    data: [],
    info: undefined,
    meta: { totalAmount: 0 },
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchTodos(setTodos);
  }, []);

  return (
    <div className="todo-list">
      <TodoAdd fetchPost={fetchPost} setTodos={setTodos} />
      <ListSwitches
        currentFilter={filter}
        todos={todos}
        setFilter={setFilter}
      />
      <TodoList items={todos} filter={filter} setTodos={setTodos} />
    </div>
  );
};

export default TodoListPage;
