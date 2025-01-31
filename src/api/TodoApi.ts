import { MetaResponse, Todo, TodoInfo } from "../types";
const url = "https://easydev.club/api/v2";
export const fetchEdit = (
  item: Todo,
  newTitle: string,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  fetch(`${url}/todos/${item.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: newTitle }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchTodos(setTodos);
    })
    .catch((error) => {
      console.error("Failed to edit todo:", error);
      throw error;
    });
};

export const fetchDelete = (
  item: Todo,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  fetch(`${url}/todos/${item.id}`, { method: "DELETE" })
    .then(() => {
      fetchTodos(setTodos);
    })
    .catch((error) => {
      console.error("Failed to delete todo:", error);
      throw error;
    });
};
export const fetchPost = (
  todo: string,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  fetch(url + "/todos", {
    method: "POST",
    body: JSON.stringify({ title: todo, isDone: false }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchTodos(setTodos);
    })
    .catch((error) => {
      console.error("Failed to add todo:", error);
      throw error;
    });
};

export const fetchTodos = (
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  fetch(url + "/todos?filter={status}", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      setTodos(result);
    })
    .catch((error) => {
      console.error("Failed to fetch todos:", error);
      throw error;
    });
};

export const fetchChecked = (
  event: React.ChangeEvent<HTMLInputElement>,
  item: Todo,
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
) => {
  const updatedIsDone = event.target.checked;
  fetch(`${url}/todos/${item.id}`, {
    method: "PUT",
    body: JSON.stringify({ isDone: updatedIsDone }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchTodos(setTodos);
    })
    .catch((error) => {
      console.error("Failed to update todo status:", error);
    });
};
