export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}
export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}
export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}
export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export enum TodoStatus {
  ALL = "all",
  COMPLETED = "completed",
  IN_WORK = "inWork",
}
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
  accessToken: string;
  refreshToken: string;
}
