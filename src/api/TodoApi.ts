import { MetaResponse, Todo, TodoInfo } from "../types";
const url = "https://easydev.club/api/v2";
export const fetchEdit = async (
  item: Todo,
  newTitle: string,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  try {
    const response = await fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) {
      throw new Error("Failed to edit todo");
    }
    fetchTodos(setTodos);
  } catch (err) {
    console.error("Failed to edit todo:", err);
    throw err;
  }
};

export const fetchDelete = async (
  item: Todo,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  try {
    const response = await fetch(`${url}/todos/${item.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    fetchTodos(setTodos);
  } catch (err) {
    console.error("Failed to delete todo:", err);
    throw err;
  }
};
export const fetchPost = async (
  todo: string,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  try {
    const response = await fetch(url + "/todos", {
      method: "POST",
      body: JSON.stringify({ title: todo, isDone: false }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    fetchTodos(setTodos);
  } catch (err) {
    console.error("Failed to add todo:", err);
    throw err;
  }
};

export const fetchTodos = async (
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  try {
    const response = await fetch(url + "/todos?filter={status}", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const result: MetaResponse<Todo, TodoInfo> = await response.json();
    setTodos(result);
  } catch (err) {
    {
      console.error("Failed to fetch todos:", err);
      throw err;
    }
  }
};

export const fetchChecked = async (
  event: React.ChangeEvent<HTMLInputElement>,
  item: Todo,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  try {
    const updatedIsDone = event.target.checked;
    const response = await fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: updatedIsDone }),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo status");
    }
    fetchTodos(setTodos);
  } catch (err) {
    console.error("Failed to update todo status:", err);
    throw err;
  }
};
