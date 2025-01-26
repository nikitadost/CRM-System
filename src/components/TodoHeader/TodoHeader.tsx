import { useState } from "react";

interface ComponentProps {
  fetchPost: (title: string) => void;
}

const TodoHeader: React.FC<ComponentProps> = ({ fetchPost }) => {
  const [todo, setTodo] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodo(value);
  };
  const handlePost = () => {
    fetchPost(todo);
    setTodo("");
  };

  return (
    <div className="todo-header">
      <input
        value={todo}
        className="todo-input"
        type="text"
        placeholder="Task To Be Done..."
        onChange={handleChange}
      />
      <button className="add-btn" onClick={handlePost}>
        Add
      </button>
    </div>
  );
};

export default TodoHeader;
