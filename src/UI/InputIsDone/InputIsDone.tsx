import { MetaResponse, Todo, TodoInfo } from "../../types";

interface ComponentProps {
  fetchChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Todo,
    setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
  ) => void;
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>;
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
