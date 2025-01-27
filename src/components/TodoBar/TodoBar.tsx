interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

interface ComponentProps {
  todos: MetaResponse<T, N>;
  setFilter: (filter: string) => void;
  currentFilter: string;
}

const TodoBar: React.FC<ComponentProps> = ({
  todos,
  setFilter,
  currentFilter,
}) => {
  return (
    <div className="todo-bar">
      <h3
        className={`title ${currentFilter === "all" ? "selected" : ""}`}
        onClick={() => setFilter("all")}
      >
        Все ({todos && todos.info && todos.info.all ? todos.info.all : 0})
      </h3>
      <h3
        className={`title ${currentFilter === "inWork" ? "selected" : ""}`}
        onClick={() => setFilter("inWork")}
      >
        в работе(
        {todos && todos.info && todos.info.inWork ? todos.info.inWork : 0})
      </h3>
      <h3
        className={`title ${currentFilter === "completed" ? "selected" : ""}`}
        onClick={() => setFilter("completed")}
      >
        сделано (
        {todos && todos.info && todos.info.completed ? todos.info.completed : 0}
        )
      </h3>
    </div>
  );
};

export default TodoBar;
