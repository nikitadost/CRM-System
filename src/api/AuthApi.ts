import { AuthData, User, Token, UserRegistration } from "../types/types";
import api from "./api";
import { setAccessToken, setRefreshToken } from "./AuthTokens";

export const registerUser = async (data: UserRegistration) => {
  console.log("Отправка данных регистрации на сервер:", data);
  try {
    const response = await api.post<User>("/auth/signup", data);
    console.log("Успешная регистрация:", response.data);
    return response.data;
  } catch (error) {
    if (error) {
      console.error("Ошибка при регистрации:", error);
    }
    throw error;
  }
};

export const loginUser = async (data: AuthData) => {
  console.log("Отправка данных авторизации на сервер:", data);
  try {
    const response = await api.post<Token>("/auth/signin", data);
    setRefreshToken(response.data.refreshToken);
    setAccessToken(response.data.accessToken);
    console.log("Успешная авторизация:", response.data);
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  console.log("Выход из системы");
  try {
    const response = await api.post("/user/logout");
    console.log("Успешный выход:", response);
  } catch (error) {
    console.error("Ошибка выхода", error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    console.log("Получение профиля пользователя:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении профиля", error);
    throw error;
  }
};

export const refreshToken = async (token: string) => {
  try {
    console.log("Обновление рефреш токеном: ", token);
    const response = await api.post("/auth/refresh", {
      refreshToken: token,
    });
    setRefreshToken(response.data.refreshToken);
    setAccessToken(response.data.accessToken);
    console.log("Токены обнвлены", response.data);
    return response.data.accessToken;
  } catch (error) {
    console.error("Ошибка обновления токена", error);
    throw error;
  }
};
