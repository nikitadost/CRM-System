import { MetaResponse, Todo, TodoInfo } from "../../types";
import DeleteIcon from "../Icons/DeleteIcon";

interface ComponentProps {
  fetchDelete: (
    item: Todo,
    setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>
  ) => void;
  item: Todo;
  setTodos: React.Dispatch<React.SetStateAction<MetaResponse<Todo, TodoInfo>>>;
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
