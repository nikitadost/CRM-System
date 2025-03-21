import api from "./api";
import { TodoStatus } from "../types/types";

export const postTodo = async (todo: string) => {
  try {
    await api.post("/todos", {
      title: todo,
      isDone: false,
    });
    console.log("postTodo");
  } catch (err) {
    console.error("Failed to add todo:", err);
    throw err;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const response = await api.get("/todos", {
      params: { filter: status },
    });
    console.log("fetch filtered by status Todos");
    return response.data;
  } catch (err) {
    {
      console.error("Failed to fetch todos:", err);
      throw err;
    }
  }
};

export const editTodo = async (id: number, newTitle: string) => {
  try {
    await api.put(`/todos/${id}`, { title: newTitle });
    console.log("editTodo");
  } catch (err) {
    console.error("Failed to edit todo :", err);
    throw err;
  }
};

export const updateTodoStatus = async (updatedIsDone: boolean, id: number) => {
  try {
    await api.put(`/todos/${id}`, {
      isDone: updatedIsDone,
    });
    console.log("updateTodoStatus");
  } catch (err) {
    console.error("Failed to update todo status:", err);
    throw err;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await api.delete(`/todos/${id}`);
    console.log("deleteTodo");
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
};
