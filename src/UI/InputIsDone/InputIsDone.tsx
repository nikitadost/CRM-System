import { SetTodos, Todo } from "../../types";

interface ComponentProps {
  fetchChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo,
    setTodos: SetTodos
  ) => void;
  item: Todo;
  setTodos: SetTodos;
}

const InputIsDone: React.FC<ComponentProps> = ({
  fetchChecked,
  item,
  setTodos,
}) => {
  return (
    <input
      type="checkbox"
      checked={item.isDone}
      onChange={(event) => {
        fetchChecked(event, item, setTodos);
      }}
    />
  );
};

export default InputIsDone;
