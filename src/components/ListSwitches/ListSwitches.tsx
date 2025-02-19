import { TodoInfo, TodoStatus } from "../../types/types";
import { Segmented } from "antd";
interface ComponentProps {
  setFilter: (filter: TodoStatus) => void;
  currentFilter: TodoStatus;
  info: TodoInfo;
}
const ListSwitches: React.FC<ComponentProps> = ({
  info,
  setFilter,
  currentFilter,
}) => {
  const ListSwitchesOptions = [
    { label: `Все (${info.all})`, value: TodoStatus.ALL },
    { label: `в работе (${info.inWork})`, value: TodoStatus.IN_WORK },
    { label: `сделано (${info.completed})`, value: TodoStatus.COMPLETED },
  ];

  return (
    <Segmented
      options={ListSwitchesOptions}
      value={currentFilter}
      onChange={setFilter}
    />
  );
};

export default ListSwitches;
