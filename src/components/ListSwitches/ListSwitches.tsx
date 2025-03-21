import React, { useMemo } from "react";
import { TodoInfo, TodoStatus } from "../../types/types";
import { Segmented } from "antd";
interface ListSwitchesProps {
  setFilter: (filter: TodoStatus) => void;
  currentFilter: TodoStatus;
  info: TodoInfo;
}
const ListSwitches: React.FC<ListSwitchesProps> = React.memo(
  ({ info, setFilter, currentFilter }) => {
    const ListSwitchesOptions = useMemo(() => {
      return [
        { label: `Все (${info.all})`, value: TodoStatus.ALL },
        { label: `в работе (${info.inWork})`, value: TodoStatus.IN_WORK },
        { label: `сделано (${info.completed})`, value: TodoStatus.COMPLETED },
      ];
    }, [info]);
    return (
      <Segmented
        options={ListSwitchesOptions}
        value={currentFilter}
        onChange={setFilter}
      />
    );
  }
);

export default ListSwitches;
