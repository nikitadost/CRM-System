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
export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}
export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
export interface UserRolesRequest {
  roles: Roles[];
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
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
