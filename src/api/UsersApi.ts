import { Roles, UserFilters, UserRequest } from "../types/types";
import api from "./api";

export const getUsers = async (filter: UserFilters) => {
  try {
    const response = await api.get("/admin/users", {
      params: filter,
    });
    return response;
  } catch (error) {
    console.error("Ошибка получения пользователей:", error);
  }
};

export const getUserProfile = async (id: number) => {
  try {
    const response = await api.get(`/admin/users/${id}`, {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка получения профиля пользователя ${id}:`, error);
  }
};

export const updateUserProfile = async (id: number, data: UserRequest) => {
  try {
    const response = await api.put(`/admin/users/${id}`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка изменения профиля пользователю ${id}:`, error);
  }
};

export const removeUser = async (id: number) => {
  try {
    const response = await api.delete(`/admin/users/${id}`, {
      params: { id: id },
    });
    return response;
  } catch (error) {
    console.error(`Ошибка удаления пользователя ${id}:`, error);
  }
};

export const blockUser = async (id: number) => {
  try {
    const response = await api.post(`/admin/users/${id}/block`, {
      params: { id: id },
    });
    return response;
  } catch (error) {
    console.error(`Ошибка блокировки пользователя ${id}:`, error);
  }
};

export const unblockUser = async (id: number) => {
  try {
    const response = await api.post(`/admin/users/${id}/unblock`, {
      params: { id: id },
    });
    return response;
  } catch (error) {
    console.error(`Ошибка активации учетной записи пользователя ${id}:`, error);
  }
};

export const updateUserRoles = async (id: number, roles: Roles[]) => {
  try {
    const response = await api.post(`/admin/users/${id}/rights`, {
      roles: roles,
    });
    return response;
  } catch (error) {
    console.error(`Ошибка обновления ролей пользователя ${id}:`, error);
    throw error;
  }
};
