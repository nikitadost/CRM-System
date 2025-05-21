import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Roles } from "../types/types";
import { mainRoutes } from "./mainRoutes";
import { authRoutes } from "./authRoutes";

const AppRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userData);
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const hasAdvancedAccess =
    user?.roles?.some(
      (role) => role === Roles.ADMIN || role === Roles.MODERATOR
    ) ?? false;

  const router = createBrowserRouter([
    mainRoutes(isAuthenticated, hasAdvancedAccess),
    !isAuthenticated
      ? authRoutes
      : { path: "*", element: <Navigate to="/todolist" /> },
    {
      path: "*",
      element: (
        <Navigate
          to={isAuthenticated ? "/user-profile" : "/auth/authorization"}
        />
      ),
    },
  ]);

  if (isLoading) {
    return null;
  }

  return <RouterProvider router={router} />;
};

export default AppRouter;
