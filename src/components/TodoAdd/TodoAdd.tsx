import React, { useCallback } from "react";
import { fetchPost } from "../../api/TodoApi";
import { Form, Input, Button } from "antd";
interface TodoAddProps {
  handleFetch: () => void;
}
const TodoAdd: React.FC<TodoAddProps> = React.memo(({ handleFetch }) => {
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async () => {
    try {
      const validatedField = await form.validateFields();
      const todo = validatedField.title;
      await fetchPost(todo);
      await handleFetch();
      await form.resetFields();
    } catch (err) {
      console.error("Failed to add todo:", err);
      throw err;
    }
  }, [handleFetch, form]);
  console.log("TodoAdd render");
  return (
    <Form form={form} layout="vertical">
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
      <Button type="primary" onClick={handleSubmit}>
        Add
      </Button>
    </Form>
  );
});

export default TodoAdd;
