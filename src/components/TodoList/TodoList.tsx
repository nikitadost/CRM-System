import React, { useMemo } from "react";
import { List } from "antd";
import { Todo } from "../../types/types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  items: Todo[];
  handleFetch: () => void;
}

const TodoList: React.FC<TodoListProps> = React.memo(
  ({ items, handleFetch }) => {
    console.log("TodoList render");
    const memoizedItems = useMemo(() => items, [items]);

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
        dataSource={memoizedItems}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <TodoItem item={item} handleFetch={handleFetch} />
          </List.Item>
        )}
      />
    );
  }
);

export default TodoList;
