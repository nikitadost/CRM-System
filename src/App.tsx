import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setLoading } from "./redux/AuthSlice";
import AuthTokens from "./api/AuthTokens";
import { refreshToken } from "./api/AuthApi";
import { clearUser } from "./redux/UserSlice";
import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  const tokens = AuthTokens.getInstance();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateRefreshToken = async () => {
      dispatch(setLoading(true));
      try {
        await refreshToken(tokens.getRefreshToken());
        if (tokens.getAccessToken()) {
          dispatch(login());
        } else {
          tokens.removeTokens();
          dispatch(logout());
        }
      } catch (error) {
        console.error("Ошибка обновления токена:", error);
        tokens.removeTokens();
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!tokens.getAccessToken()) {
      updateRefreshToken();
    } else {
      dispatch(setLoading(false));
    }
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "refreshToken" && !event.newValue) {
        tokens.removeTokens();
        dispatch(logout());
        dispatch(clearUser());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, tokens]);

  return <AppRouter />;
};

export default App;
