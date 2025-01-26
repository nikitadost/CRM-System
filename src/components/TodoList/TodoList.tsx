import { useEffect, useState } from "react";
import "./TodoList.css";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoBar from "../TodoBar/TodoBar";
import TodoItem from "../TodoItem/TodoItem";

// interface TodoRequest {
//   title?: string;
//   isDone?: boolean; // изменение статуса задачи происходит через этот флаг
// }

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

const TodoList = () => {
  const url = "https://easydev.club/api/v2";
  const [todos, setTodos] = useState<MetaResponse<T, N>>({});

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(url + "/todos?filter={status}", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result: MetaResponse<T, N>) => {
        setTodos(result);
        console.log(result);
      });
  };

  const fetchPost = (todo: string) => {
    fetch(url + "/todos", {
      method: "POST",
      body: JSON.stringify({ title: todo, isDone: false }),
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos((todos) => ({
          data: [...todos.data, result],
          info: {
            all: todos.info?.all + 1 || 1,
            completed: todos.info?.completed || 0,
            inWork: todos.info?.inWork + 1 || 1,
          },
          meta: todos.meta,
        }));
      });
  };

  const fetchDelete = (item: Todo) => {
    fetch(`${url}/todos/${item.id}`, { method: "DELETE" }).then(() => {
      setTodos((todos) => ({
        data: todos.data.filter((todo) => todo.id !== item.id),
        info: {
          all: todos.info?.all - 1 || 0,
          completed: item.isDone
            ? todos.info?.completed - 1 || 0
            : todos.info?.completed || 0,
          inWork: item.isDone
            ? todos.info?.inWork || 0
            : todos.info?.inWork - 1 || 0,
        },
        meta: todos.meta,
      }));
    });
  };

  const fetchChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo
  ) => {
    const updatedIsDone = event.target.checked;
    fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ isDone: updatedIsDone }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((todos) => {
          const updatedData = todos.data.map((todo) =>
            todo.id === item.id ? { ...todo, isDone: updatedIsDone } : todo
          );
          const completedCount = updatedData.filter(
            (todo) => todo.isDone
          ).length;
          const inWorkCount = updatedData.length - completedCount;

          return {
            data: updatedData,
            info: {
              all: updatedData.length,
              completed: completedCount,
              inWork: inWorkCount,
            },
            meta: todos.meta,
          };
        });
      });
  };

  const fetchEdit = (item: Todo, newTitle: string) => {
    fetch(`${url}/todos/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((todos) => ({
          data: todos.data.map((todo) =>
            todo.id === item.id ? { ...todo, title: newTitle } : todo
          ),
          info: todos.info,
          meta: todos.meta,
        }));
      });
  };

  return (
    <div className="todo-list">
      <TodoHeader fetchPost={fetchPost} />
      <div>
        <TodoBar todos={todos} />
        <ul className="todo-items">
          {todos &&
            todos.data &&
            todos.data.map((item: Todo) => (
              <TodoItem
                key={item.id}
                item={item}
                fetchChecked={fetchChecked}
                fetchDelete={fetchDelete}
                fetchEdit={fetchEdit}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
