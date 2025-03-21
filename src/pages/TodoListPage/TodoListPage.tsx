import { useCallback, useEffect, useState } from "react";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListSwitches from "../../components/ListSwitches/ListSwitches";
import { Todo, TodoInfo, TodoStatus } from "../../types/types";
import { fetchTodos } from "../../api/TodoApi";
import TodoList from "../../components/TodoList/TodoList";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Layout } from "antd";

const TodoListPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentFilter = searchParams.get("filter") || TodoStatus.ALL;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const handleFetch = useCallback(async () => {
    const res = await fetchTodos(currentFilter as TodoStatus);
    setTodos((prevTodos) =>
      JSON.stringify(prevTodos) !== JSON.stringify(res.data)
        ? res.data
        : prevTodos
    );
    setInfo((prevInfo) =>
      JSON.stringify(prevInfo) !== JSON.stringify(res.info)
        ? res.info
        : prevInfo
    );
  }, [currentFilter]);

  const updateFilter = (newFilter: TodoStatus) => {
    searchParams.set("filter", newFilter);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    handleFetch();
    const intervalId = setInterval(() => {
      handleFetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [handleFetch]);

  return (
    <Layout>
      <TodoAdd handleFetch={handleFetch} />
      <ListSwitches
        setFilter={updateFilter}
        currentFilter={currentFilter as TodoStatus}
        info={info}
      />
      <TodoList items={todos} handleFetch={handleFetch} />
    </Layout>
  );
});

export default TodoListPage;
