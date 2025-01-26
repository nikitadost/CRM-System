interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

interface ComponentProps {
  todos: MetaResponse<T, N>;
}

const TodoBar: React.FC<ComponentProps> = ({ todos }) => {
  return (
    <div className="todo-bar">
      <h3 className="title">
        Все ({todos && todos.info && todos.info.all ? todos.info.all : 0})
      </h3>
      <h3 className="title">
        в работе(
        {todos && todos.info && todos.info.inWork ? todos.info.inWork : 0})
      </h3>
      <h3 className="title">
        сделано (
        {todos && todos.info && todos.info.completed ? todos.info.completed : 0}
        )
      </h3>
    </div>
  );
};

export default TodoBar;
