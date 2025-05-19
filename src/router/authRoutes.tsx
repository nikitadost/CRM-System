import { Navigate } from "react-router";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import AuthorizationPage from "../pages/AuthorizationPage/AuthorizationPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="authorization" /> },
    { path: "authorization", element: <AuthorizationPage /> },
    { path: "registration", element: <RegistrationPage /> },
    { path: "*", element: <AuthorizationPage /> },
  ],
};
