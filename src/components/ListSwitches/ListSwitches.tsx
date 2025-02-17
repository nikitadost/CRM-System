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
          currentFilter === TodoStatus.ALL ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.ALL)}
      >
        Все ({info.all})
      </h3>
      <h3
        className={`title ${
          currentFilter === TodoStatus.IN_WORK ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.IN_WORK)}
      >
        в работе(
        {info.inWork})
      </h3>
      <h3
        className={`title ${
          currentFilter === TodoStatus.COMPLETED ? "selected" : ""
        }`}
        onClick={() => handleFilter(TodoStatus.COMPLETED)}
      >
        сделано ({info.completed})
      </h3>
    </div>
  );
};

export default ListSwitches;
