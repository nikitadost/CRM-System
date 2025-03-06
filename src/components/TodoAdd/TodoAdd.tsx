import React from "react";
import { postTodo } from "../../api/TodoApi";
import { Form, Input, Button } from "antd";
interface TodoAddProps {
  handleFetch: () => void;
}
interface FormTitle {
  title: string;
}
const TodoAdd: React.FC<TodoAddProps> = React.memo(({ handleFetch }) => {
  const [form] = Form.useForm();
  const onFinish = async (value: FormTitle) => {
    try {
      await postTodo(value.title);
      await handleFetch();
      form.resetFields();
    } catch (err) {
      console.error("Failed to add todo:", err);
      throw err;
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Task title is required!" },
          {
            min: 2,
            message: "Task title should be between 2 and 64 characters.",
          },
          {
            max: 64,
            message: "Task title should be between 2 and 64 characters.",
          },
        ]}
      >
        <Input placeholder="Task To Be Done..." />
      </Form.Item>
      <Form.Item>
        <Button className="login-btn" block type="primary" htmlType="submit">
          <span className="login-btn-text">Add</span>
        </Button>
      </Form.Item>
    </Form>
  );
});

export default TodoAdd;
