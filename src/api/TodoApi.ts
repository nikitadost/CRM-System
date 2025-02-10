import { MetaResponse, Todo, TodoInfo, TodoStatus } from "../types/types";

const url = "https://easydev.club/api/v1";

export const fetchEdit = async (id: number, newTitle: string) => {
  try {
    const response = await fetch(`${url}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) {
      throw new Error("Failed to edit todo");
    }
  } catch (err) {
    console.error("Failed to edit todo:", err);
    throw err;
  }
};

export const fetchDelete = async (id: number) => {
  try {
    const response = await fetch(`${url}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
};

export const fetchPost = async (todo: string) => {
  try {
    const response = await fetch(url + "/todos", {
      method: "POST",
      body: JSON.stringify({ title: todo, isDone: false }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
  } catch (err) {
    console.error("Failed to add todo:", err);
    throw err;
  }
};

export const fetchTodos = async (status: TodoStatus) => {
  try {
    const response = await fetch(url + `/todos?filter=${status}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const result: MetaResponse<Todo, TodoInfo> = await response.json();
    return result;
  } catch (err) {
    {
      console.error("Failed to fetch todos:", err);
      throw err;
    }
  }
};

export const fetchChecked = async (
  event: React.ChangeEvent<HTMLInputElement>,
  id: number
) => {
  try {
    const updatedIsDone = event.target.checked;
    const response = await fetch(`${url}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: updatedIsDone }),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo status");
    }
  } catch (err) {
    console.error("Failed to update todo status:", err);
    throw err;
  }
};
