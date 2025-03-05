import TodoListPage from "./pages/TodoListPage/TodoListPage";
import { Routes, Route, Navigate } from "react-router";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import React from "react";

const App: React.FC = React.memo(() => {
  return (
    <Routes>
      <Route path="todolist" element={<TodoListPage />} />
      <Route path="user-profile" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/todolist" replace />} />
      <Route path="/" element={<Navigate to="/todolist" replace />} />
    </Routes>
  );
});

export default App;
