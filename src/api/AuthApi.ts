import api from "./api";

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export const fetchSignUp = async (data: UserRegistration) => {
  console.log("Отправка данных на сервер:", data);
  try {
    const response = await api.post("/auth/signup", data);

    console.log("Успешная регистрация:", response.data);
    return response.data;
  } catch (error) {
    if (error) {
      console.error("Ошибка при регистрации:", error);
    }

    throw error;
  }
};

export const fetchSignIn = async (data: AuthData) => {
  try {
    const response = await api.post("/auth/signin", data);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    console.log(response);
  } catch (err) {
    console.error("Ошибка при авторизации:", err);
  }
};
