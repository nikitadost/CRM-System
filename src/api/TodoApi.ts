import api from "./api";
import { TodoStatus } from "../types/types";

export const fetchPost = async (todo: string) => {
  try {
    await api.post("/todos", {
      title: todo,
      isDone: false,
    });
    console.log("это пост");
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
    console.log("фетч тудос", response.data);
    return response.data;
  } catch (err) {
    {
      console.error("Failed to fetch todos:", err);
      throw err;
    }
  }
};

export const fetchEdit = async (id: number, newTitle: string) => {
  try {
    await api.put(`/todos/${id}`, { title: newTitle });
    console.log("изменен");
  } catch (err) {
    console.error("Failed to edit todo:", err);
    throw err;
  }
};

export const fetchChecked = async (updatedIsDone: boolean, id: number) => {
  try {
    await api.put(`/todos/${id}`, {
      isDone: updatedIsDone,
    });
    console.log("чекед");
  } catch (err) {
    console.error("Failed to update todo status:", err);
    throw err;
  }
};

export const fetchDelete = async (id: number) => {
  try {
    await api.delete(`/todos/${id}`);
    console.log("удален");
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
};
