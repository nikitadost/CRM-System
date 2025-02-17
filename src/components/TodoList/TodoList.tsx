import { Todo } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
interface TodoListProps {
  items: Todo[];
  handleFetch: () => void;
}
const TodoList: React.FC<TodoListProps> = ({ items, handleFetch }) => {
  return (
    <div className="todos-wrap">
      <ul className="todo-items">
        {items.map((item: Todo) => (
          <TodoItem key={item.id} item={item} handleFetch={handleFetch} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
