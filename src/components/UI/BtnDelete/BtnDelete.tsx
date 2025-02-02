import { Todo, SetTodos } from "../../../types/types";
import DeleteIcon from "../Icons/DeleteIcon";

interface ComponentProps {
  fetchDelete: (item: Todo, setTodos: SetTodos) => void;
  item: Todo;
  setTodos: SetTodos;
}

const BtnDelete: React.FC<ComponentProps> = ({
  fetchDelete,
  item,
  setTodos,
}) => {
  return (
    <div className="delete-btn" onClick={() => fetchDelete(item, setTodos)}>
      <DeleteIcon />
    </div>
  );
};

export default BtnDelete;
