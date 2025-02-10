import { Todo, TodoStatus } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
interface TodoListProps {
  items: Todo[];
  filter: TodoStatus;
  handleFetch: (status: TodoStatus) => void;
}
const TodoList: React.FC<TodoListProps> = ({ items, handleFetch, filter }) => {
  return (
    <div className="todos-wrap">
      <ul className="todo-items">
        {items.map((item: Todo) => (
          <TodoItem
            key={item.id}
            item={item}
            handleFetch={handleFetch}
            filter={filter}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
