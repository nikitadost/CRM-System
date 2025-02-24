import React, { useCallback, useState } from "react";
import { Todo } from "../../types/types";
import {
  EditFilled,
  DeleteFilled,
  SaveFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { fetchDelete, fetchEdit, fetchChecked } from "../../api/TodoApi";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd";

interface TodoItemProps {
  handleFetch: () => void;
  item: Todo;
}
const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ item, handleFetch }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [checked, setChecked] = useState<boolean>(item.isDone);
    const [form] = Form.useForm();

    const handleCheck = useCallback(
      async (e: CheckboxChangeEvent) => {
        const status = e.target.checked;
        setChecked(status);
        await fetchChecked(status, item.id);
        await handleFetch();
      },
      [item.id, handleFetch]
    );

    const handleEditTitle = () => {
      setIsEditMode(true);
    };

    const handleSaveTitle = useCallback(async () => {
      try {
        const validatedField = await form.validateFields();
        const newTitle = validatedField.title;
        await fetchEdit(item.id, newTitle);
        await handleFetch();
        setIsEditMode(false);
      } catch (err) {
        console.error("Failed to add todo:", err);
        throw err;
      }
    }, [form, item.id, handleFetch]);

    const handleCancelEdit = useCallback(async () => {
      await form.setFieldsValue({ title: item.title });
      setIsEditMode(false);
    }, [form, item.title]);

    const handleDelete = useCallback(async () => {
      await fetchDelete(item.id);
      await handleFetch();
    }, [item.id, handleFetch]);

    console.log("TodoItem render", item.id);
    return (
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          border: "none",
        }}
      >
        <Checkbox checked={checked} onChange={(e) => handleCheck(e)} />

        <Form
          form={form}
          initialValues={{ title: item.title }}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%",
            color: "black",
            backgroundColor: "white",
            border: "none",
            padding: "10px",
          }}
        >
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Task title is required!" },
              {
                min: 2,
                message: "Task title must be at least 2 characters long!",
              },
              { max: 64, message: "Task title must not exceed 64 characters!" },
            ]}
          >
            <Input
              style={{
                padding: 0,
                color: "black",
                backgroundColor: "white",
                border: "none",
              }}
              placeholder="Task title"
              disabled={!isEditMode}
              className="container"
            />
          </Form.Item>
        </Form>

        {!isEditMode && (
          <Button color="primary" variant="outlined" onClick={handleEditTitle}>
            <EditFilled />
          </Button>
        )}
        {isEditMode && (
          <Button color="primary" variant="outlined" onClick={handleSaveTitle}>
            <SaveFilled />
          </Button>
        )}
        {isEditMode && (
          <Button
            style={{ backgroundColor: "#ffffff" }}
            onClick={handleCancelEdit}
          >
            <CloseCircleFilled />
          </Button>
        )}
        <Button color="danger" variant="solid" onClick={handleDelete}>
          <DeleteFilled />
        </Button>
      </Flex>
    );
  }
);

export default TodoItem;
