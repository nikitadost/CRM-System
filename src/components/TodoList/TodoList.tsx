import { MetaResponse, SetTodos, Todo, TodoInfo } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
import { fetchDelete, fetchEdit, fetchChecked } from "../../api/TodoApi";

interface TodoListProps {
  items: MetaResponse<Todo, TodoInfo>;
  filter: string;
  setTodos: SetTodos;
}

const TodoList: React.FC<TodoListProps> = ({ items, filter, setTodos }) => {
  const filteredTodos = (items: MetaResponse<Todo, TodoInfo>) => {
    switch (filter) {
      case "all":
        return items.data;
      case "inWork":
        return items.data.filter((item) => !item.isDone);
      case "completed":
        return items.data.filter((item) => item.isDone);
      default:
        return items.data;
    }
  };

  return (
    <div className="todos-wrap">
      <ul className="todo-items">
        {items &&
          items.data &&
          filteredTodos(items).map((item: Todo) => (
            <TodoItem
              key={item.id}
              item={item}
              fetchChecked={fetchChecked}
              fetchDelete={fetchDelete}
              fetchEdit={fetchEdit}
              setTodos={setTodos}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
