import { Todo } from "../../types";

interface ComponentProps {
  fetchChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo
  ) => void;
  item: Todo;
}

const BtnDelete: React.FC<ComponentProps> = ({ fetchChecked, item }) => {
  return (
    <input
      type="checkbox"
      checked={item.isDone}
      onChange={(event) => {
        fetchChecked(event, item);
      }}
    />
  );
};

export default BtnDelete;
