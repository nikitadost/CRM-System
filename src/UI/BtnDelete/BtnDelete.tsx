import { Todo } from "../../components/TodoList/TodoList";
import DeleteIcon from "../Icons/DeleteIcon";

interface ComponentProps {
  fetchDelete: (item: Todo) => void;
  item: Todo;
}

const BtnDelete: React.FC<ComponentProps> = ({ fetchDelete, item }) => {
  return (
    <div className="delete-btn" onClick={() => fetchDelete(item)}>
      <DeleteIcon />
    </div>
  );
};

export default BtnDelete;
