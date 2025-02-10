import { TodoInfo, TodoStatus } from "../../types/types";
interface ComponentProps {
  setFilter: (filter: TodoStatus) => void;
  currentFilter: TodoStatus;
  info: TodoInfo;
  handleFetch: (status: TodoStatus) => void;
}

const ListSwitches: React.FC<ComponentProps> = ({
  info,
  setFilter,
  currentFilter,
  handleFetch,
}) => {
  const handleFilter = (filter: TodoStatus) => {
    setFilter(filter);
    handleFetch(filter);
  };

  return (
    <div className="todo-bar">
      <h3
        className={`title ${
          currentFilter === TodoStatus.all ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.all)}
      >
        Все ({info.all})
      </h3>
      <h3
        className={`title ${
          currentFilter === TodoStatus.inWork ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.inWork)}
      >
        в работе(
        {info.inWork})
      </h3>
      <h3
        className={`title ${
          currentFilter === TodoStatus.completed ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.completed)}
      >
        сделано ({info.completed})
      </h3>
    </div>
  );
};

export default ListSwitches;
