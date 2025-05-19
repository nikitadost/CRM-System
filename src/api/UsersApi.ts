import { Roles, UserFilters, UserRequest } from "../types/types";
import api from "./api";

export const getUsers = async (filter: UserFilters) => {
  try {
    const response = await api.get("/admin/users", {
      params: filter,
    });
    console.log("ответ админу со списком пользователей:", response);
    return response;
  } catch (error) {
    console.error("Ошибка получения админом пользователей:", error);
  }
};

export const getUserProfile = async (id: number) => {
  try {
    const response = await api.get(`/admin/users/${id}`, {
      params: { id: id },
    });
    console.log(`ответ админу с профилем пользователя ${id}:`, response);
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка получения админом профиля пользователя ${id}:`,
      error
    );
  }
};

export const updateUserProfile = async (id: number, data: UserRequest) => {
  console.log("data", data);
  try {
    const response = await api.put(`/admin/users/${id}`, {
      ...data,
    });
    console.log(
      `Успешный запрос в котором измененные данные пользователя ${id}:`,
      response
    );
    return response.data;
  } catch (error) {
    console.error(
      `Ошибка изменения профиля админом пользователю ${id}:`,
      error
    );
  }
};

export const removeUser = async (id: number) => {
  try {
    const response = await api.delete(`/admin/users/${id}`, {
      params: { id: id },
    });
    console.log(
      `Успешный запрос в котором удалены данные пользователя ${id}:`,
      response
    );
    return response;
  } catch (error) {
    console.error(`Ошибка удаления админом пользователя ${id}:`, error);
  }
};

export const blockUser = async (id: number) => {
  try {
    const response = await api.post(`/admin/users/${id}/block`, {
      params: { id: id },
    });
    console.log(`Успешная блокировка пользователя ${id}:`, response);
    return response;
  } catch (error) {
    console.error(`Ошибка блокировки админом пользователя ${id}:`, error);
  }
};

export const unblockUser = async (id: number) => {
  try {
    const response = await api.post(`/admin/users/${id}/unblock`, {
      params: { id: id },
    });
    console.log(
      `Учетная запись пользователя успешно активирована ${id}:`,
      response
    );
    return response;
  } catch (error) {
    console.error(
      `Ошибка активирования учетной записи пользователя ${id}:`,
      error
    );
  }
};

export const updateUserRoles = async (id: number, roles: Roles[]) => {
  try {
    console.log(roles);
    const response = await api.post(`/admin/users/${id}/rights`, {
      roles: roles,
    });
    console.log(`Роли пользователя успешно обновлены ${id}:`, response);
    return response;
  } catch (error) {
    console.error(`Ошибка обновления ролей пользователя ${id}:`, error);
    throw error;
  }
};
