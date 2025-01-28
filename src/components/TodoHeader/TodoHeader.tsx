import { useState } from "react";

interface ComponentProps {
  fetchPost: (title: string) => void;
}

const TodoHeader: React.FC<ComponentProps> = ({ fetchPost }) => {
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTodo(value);
  };
  const handlePost = () => {
    if (todo.length < 2 || todo.length > 64) {
      setError("Task title should be between 2 and 64 characters.");
      return;
    }
    fetchPost(todo);
    setTodo("");
    setError("");
  };

  return (
    <div className="todo-header">
      <div>
        {error && <p className="error">{error}</p>}
        <textarea
          value={todo}
          className="todo-textarea"
          placeholder="Task To Be Done..."
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>
      <button className="add-btn" onClick={handlePost}>
        Add
      </button>
    </div>
  );
};

export default TodoHeader;
