import TodoListPage from "./pages/TodoListPage/TodoListPage";
import { Routes, Route, Navigate } from "react-router";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { useState } from "react";
import { TodoStatus } from "./types/types";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";

const App: React.FC = () => {
  const [filter, setFilter] = useState<TodoStatus>(TodoStatus.ALL);

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/todolist" />} />
        <Route
          path="todolist"
          element={<TodoListPage filter={filter} setFilter={setFilter} />}
        />
        <Route path="user-profile" element={<UserProfilePage />} />
        <Route path="*" element={<Navigate to="/todolist" />} />
      </Route>
    </Routes>
  );
};

export default App;
