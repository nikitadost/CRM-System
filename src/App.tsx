import React from "react";
import { Routes, Route, Navigate } from "react-router";   

import TodoListPage from "./pages/TodoListPage/TodoListPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: React.FC = React.memo(() => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
      <Route path="authorization" element={<AuthorizationPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="todolist" element={<TodoListPage />} />
      <Route path="user-profile" element={<UserProfilePage />} />

      <Route path="*" element={<Navigate to="/todolist" replace />} />
      <Route path="/" element={<Navigate to="/todolist" replace />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
});

export default App;
 
