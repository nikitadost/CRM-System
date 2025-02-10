import { useEffect, useState } from "react";
import "./TodoListPage.css";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListSwitches from "../../components/ListSwitches/ListSwitches";
import { Todo, TodoInfo, TodoStatus } from "../../types/types";
import { fetchTodos } from "../../api/TodoApi";
import TodoList from "../../components/TodoList/TodoList";

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.all);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const handleFetch = async (status: TodoStatus) => {
    const res = await fetchTodos(status);
    setTodos(res.data);
    if (res.info) {
      setInfo(res.info);
    }
  };

  useEffect(() => {
    handleFetch(TodoStatus.all);
  }, []);

  return (
    <div className="todo-list">
      <TodoAdd handleFetch={handleFetch} currentFilter={filter} />
      <ListSwitches
        currentFilter={filter}
        info={info}
        setFilter={setFilter}
        handleFetch={handleFetch}
      />
      <TodoList items={todos} filter={filter} handleFetch={handleFetch} />
    </div>
  );
};

export default TodoListPage;
