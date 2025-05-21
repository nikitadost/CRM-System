import { Navigate } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";
import TodoListPage from "../pages/TodoListPage/TodoListPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserEditPage from "../pages/UserEditPage/UserEditPage";

export const mainRoutes = (
  isAuthenticated: boolean,
  hasAdvancedAccess: boolean
) => ({
  path: "/",
  element: isAuthenticated ? (
    <MainLayout />
  ) : (
    <Navigate to="/auth/authorization" />
  ),
  children: [
    { index: true, element: <Navigate to="todolist" /> },
    { path: "todolist", element: <TodoListPage /> },
    { path: "user-profile", element: <UserProfilePage /> },

    {
      path: "users",
      element: hasAdvancedAccess ? <UsersPage /> : <Navigate to="/todolist" />,
    },
    {
      path: "users/:id",
      element: hasAdvancedAccess ? (
        <UserEditPage />
      ) : (
        <Navigate to="/todolist" />
      ),
    },
    { path: "*", element: <TodoListPage /> },
  ],
});
