import api from "./api";

// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}
// Интерфейс метаинформации

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  roles: Roles[]; // при вызове этой апи роли будут обновлены к тому массиву который будет передан
  // например если у вас была roles: ['ADMIN'] а вы хотите добавить ['MODERATOR'] то нужно передавать
  // старые + новые - roles: ['ADMIN', 'MODERATOR']
}

// Интерфейс для обновления данных пользователя
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

export const getUsersByAdmin = async (filter: UserFilters) => {
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

export const getUserProfileByAdmin = async (id: number) => {
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

export const updateUserProfileByAdmin = async (
  id: number,
  data: UserRequest
) => {
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

export const removeUserByAdmin = async (id: number) => {
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

export const blockUserByAdmin = async (id: number) => {
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

export const unblockUserByAdmin = async (id: number) => {
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

export const updateUserRolesByAdmin = async (id: number, roles: Roles[]) => {
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
