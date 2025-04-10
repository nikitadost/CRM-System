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
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
} from "./api/AuthTokens";
import { getUserProfile, refreshToken } from "./api/AuthApi";
import { clearUser, setUser } from "./redux/UserSlice";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import { Roles, User } from "./types/types";

const App: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const user = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile: User = await getUserProfile();
        dispatch(setUser(userProfile));
      } catch (error) {
        console.error("Ошибка загрузки профиля пользователя:", error);
      }
    };
    fetchUserProfile();
  }, [dispatch]);
  const isAdmin = user?.roles.includes(Roles.ADMIN) ? true : false;

  const handleRefreshToken = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await refreshToken(getRefreshToken());
      if (getAccessToken()) {
        dispatch(login());
      } else {
        removeTokens();
        dispatch(logout());
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      removeTokens();
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
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "refreshToken" && !event.newValue) {
        removeTokens();
        dispatch(logout());
        dispatch(clearUser());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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

        {
          path: "users",
          element: isAdmin ? <UsersPage /> : <Navigate to="/todolist" />,
        },
        {
          path: "users/:id",
          element: isAdmin ? <UserEditPage /> : <Navigate to="/todolist" />,
        },
        { path: "*", element: <TodoListPage /> },
      ],
    },
    {
      path: "/auth",
      element: !isAuthenticated ? <AuthLayout /> : <Navigate to="/todolist" />,
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
