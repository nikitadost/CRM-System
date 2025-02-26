import { useCallback, useEffect, useMemo, useState } from "react";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListSwitches from "../../components/ListSwitches/ListSwitches";
import { Todo, TodoInfo, TodoStatus } from "../../types/types";
import { fetchTodos } from "../../api/TodoApi";
import TodoList from "../../components/TodoList/TodoList";
import React from "react";
interface TodoListPageProps {
  filter: TodoStatus;
  setFilter: (filter: TodoStatus) => void;
}

const TodoListPage: React.FC<TodoListPageProps> = React.memo(
  ({ filter, setFilter }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [info, setInfo] = useState<TodoInfo>({
      all: 0,
      completed: 0,
      inWork: 0,
    });

    const handleFetch = useCallback(async () => {
      const res = await fetchTodos(filter);
      if (JSON.stringify(res.data) !== JSON.stringify(todos)) {
        setTodos(res.data);
      }
      if (JSON.stringify(res.info) !== JSON.stringify(info)) {
        setInfo(res.info);
      }
    }, [filter, info, todos]);

    useEffect(() => {
      handleFetch();
      const intervalId = setInterval(() => {
        handleFetch();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [filter, handleFetch]);
    console.log("TodoListPage render");
    return (
      <>
        <TodoAdd handleFetch={handleFetch} />
        <ListSwitches
          setFilter={setFilter}
          currentFilter={filter}
          info={useMemo(() => info, [info])}
        />
        <TodoList
          items={useMemo(() => todos, [todos])}
          handleFetch={handleFetch}
        />
      </>
    );
  }
);

export default TodoListPage;
