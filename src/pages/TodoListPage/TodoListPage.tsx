import { useCallback, useEffect, useState } from "react";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListSwitches from "../../components/ListSwitches/ListSwitches";
import { Todo, TodoInfo, TodoStatus } from "../../types/types";
import { fetchTodos } from "../../api/TodoApi";
import TodoList from "../../components/TodoList/TodoList";
interface TodoListPageProps {
  filter: TodoStatus;
  setFilter: (filter: TodoStatus) => void;
}

const TodoListPage: React.FC<TodoListPageProps> = ({ filter, setFilter }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const handleFetch = useCallback(
    async (status: TodoStatus) => {
      const res = await fetchTodos(status);
      setTodos(res.data);
      if (res.info) {
        setInfo(res.info);
      }
      setFilter(status);
    },
    [setFilter]
  );

  useEffect(() => {
    handleFetch(filter);

    const intervalId = setInterval(() => {
      handleFetch(filter);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [filter, handleFetch]);

  return (
    <>
      <TodoAdd handleFetch={() => handleFetch(filter)} />
      <ListSwitches setFilter={setFilter} currentFilter={filter} info={info} />
      <TodoList items={todos} handleFetch={() => handleFetch(filter)} />
    </>
  );
};

export default TodoListPage;
