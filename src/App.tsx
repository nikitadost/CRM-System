import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { TodoStatus } from "./types/types";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: React.FC = React.memo(() => {
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.ALL);
  const currentPath: string = window.location.pathname.split("/")[1];
  const [path, setPath] = useState<string>(currentPath);

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);
  console.log("App render", currentPath);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="authorization" element={<AuthorizationPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="/" element={<DefaultLayout currentPath={path} />}>
          <Route
            path="todolist"
            element={<TodoListPage filter={filter} setFilter={setFilter} />}
          />
          <Route path="user-profile" element={<UserProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
});

export default App;
