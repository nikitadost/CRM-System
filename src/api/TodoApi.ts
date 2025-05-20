import api from "./api";
import { Todo, TodoStatus } from "../types/types";

export const postTodo = async (todo: string) => {
  try {
    await api.post<Todo>("/todos", {
      title: todo,
      isDone: false,
    });
  } catch (err) {
    console.error("Ошибка добавления задачи:", err);
    throw err;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const response = await api.get("/todos", {
      params: { filter: status },
    });
    return response.data;
  } catch (err) {
    {
      console.error("Ошибка загрузки задач:", err);
      throw err;
    }
  }
};

export const editTodo = async (id: number, newTitle: string) => {
  try {
    await api.put<Todo>(`/todos/${id}`, { title: newTitle });
  } catch (err) {
    console.error("Ошибка редактирования задачи:", err);
    throw err;
  }
};

export const updateTodoStatus = async (updatedIsDone: boolean, id: number) => {
  try {
    await api.put<Todo>(`/todos/${id}`, {
      isDone: updatedIsDone,
    });
  } catch (err) {
    console.error("Ошибка обновления статуса задачи:", err);
    throw err;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await api.delete<Todo>(`/todos/${id}`);
  } catch (err) {
    console.error("Ошибка удаления задачи:", err);
    throw err;
  }
};
