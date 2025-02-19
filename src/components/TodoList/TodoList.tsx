import { List } from "antd";
import { Todo } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";
interface TodoListProps {
  items: Todo[];
  handleFetch: () => void;
}
const TodoList: React.FC<TodoListProps> = ({ items, handleFetch }) => {
  return (
    <List
      className="todos-wrap"
      style={{
        padding: "0",
        color: "black",
        backgroundColor: "white",
        border: "none",
        width: "100%",
        overflowY: "auto",
        height: "500px",
        scrollbarWidth: "none",
        scrollbarColor: "#888 #333",
      }}
      bordered
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <TodoItem key={item.id} item={item} handleFetch={handleFetch} />
        </List.Item>
      )}
    />
  );
};

export default TodoList;
