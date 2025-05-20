import React from "react";
import { TodoInfo, TodoStatus } from "../../types/types";
import { Segmented } from "antd";

interface ListSwitchesProps {
  setFilter: (filter: TodoStatus) => void;
  currentFilter: TodoStatus;
  info: TodoInfo;
}

const ListSwitches: React.FC<ListSwitchesProps> = ({
  info,
  setFilter,
  currentFilter,
}) => {
  const options = [
    { label: `Все (${info.all})`, value: TodoStatus.ALL },
    { label: `в работе (${info.inWork})`, value: TodoStatus.IN_WORK },
    { label: `сделано (${info.completed})`, value: TodoStatus.COMPLETED },
  ];

  return (
    <Segmented options={options} value={currentFilter} onChange={setFilter} />
  );
};
export default ListSwitches;
