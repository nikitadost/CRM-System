import TodoListPage from "./pages/TodoListPage/TodoListPage";
import { Routes, Route, Navigate } from "react-router";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { useCallback, useMemo, useState } from "react";
import { TodoStatus } from "./types/types";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import React from "react";

const App: React.FC = React.memo(() => {
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.ALL);
  const memoSetFilter = useCallback(
    (newFilter: TodoStatus) => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  console.log("App render");
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/todolist" />} />
        <Route
          path="todolist"
          element={
            <TodoListPage
              filter={useMemo(() => filter, [filter])}
              setFilter={memoSetFilter}
            />
          }
        />
        <Route path="user-profile" element={<UserProfilePage />} />
        <Route path="*" element={<Navigate to="/todolist" />} />
      </Route>
    </Routes>
  );
});

export default App;
