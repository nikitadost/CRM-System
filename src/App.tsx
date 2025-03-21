import React, { useCallback, useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AuthorizationPage from "./pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MainLayout from "./components/MainLayout/MainLayout";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { login, logout, setLoading } from "./redux/AuthSlice";
import { getAccessToken, getRefreshToken } from "./api/AuthTokens";
import { refreshToken } from "./api/AuthApi";

const App: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const handleRefreshToken = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await refreshToken(getRefreshToken());
      if (getAccessToken()) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!getAccessToken()) {
      handleRefreshToken();
    } else {
      dispatch(setLoading(false));
    }
  }, [handleRefreshToken, dispatch]);

  if (isLoading) {
    return null;
  }

  const router = createBrowserRouter([
    {
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
        { path: "*", element: <TodoListPage /> },
      ],
    },
    {
      path: "/auth",
      element: !isAuthenticated ? (
        <AuthLayout />
      ) : (
        <Navigate to="/user-profile" />
      ),
      children: [
        { index: true, element: <Navigate to="authorization" /> },
        { path: "authorization", element: <AuthorizationPage /> },
        { path: "registration", element: <RegistrationPage /> },
        { path: "*", element: <AuthorizationPage /> },
      ],
    },
    {
      path: "*",
      element: (
        <Navigate
          to={isAuthenticated ? "/user-profile" : "/auth/authorization"}
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
});

export default App;
