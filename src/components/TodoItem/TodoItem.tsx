import React, { useState } from "react";
import { Todo } from "../../types/types";
import {
  EditFilled,
  DeleteFilled,
  SaveFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { deleteTodo, editTodo, updateTodoStatus } from "../../api/TodoApi";
import { Checkbox, Flex, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd";
import IconButton from "../IconButton/IconButton";

interface TodoItemProps {
  handleFetch: () => void;
  item: Todo;
}
const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ item, handleFetch }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(item.isDone);
    const [form] = Form.useForm();

    const handleCheck = async (e: CheckboxChangeEvent) => {
      const status = e.target.checked;
      setChecked(status);
      await updateTodoStatus(status, item.id);
      await handleFetch();
    };

    const handleEditTitle = () => {
      setIsEditMode(true);
    };

    const handleSaveTitle = async () => {
      try {
        const validatedField = await form.validateFields();
        const newTitle = validatedField.title;
        await editTodo(item.id, newTitle);
        await handleFetch();
        setIsEditMode(false);
      } catch (err) {
        console.error("Failed to add todo:", err);
        throw err;
      }
    };

    const handleCancelEdit = async () => {
      await form.setFieldsValue({ title: item.title });
      setIsEditMode(false);
    };

    const handleDelete = async () => {
      await deleteTodo(item.id);
      await handleFetch();
    };

    return (
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          color: "black",
          backgroundColor: "white",
          border: "none",
          gap: "20px",
        }}
      >
        <Checkbox checked={checked} onChange={handleCheck} />

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
        {isEditMode ? (
          <>
            <IconButton
              color="primary"
              variant="outlined"
              onClick={handleSaveTitle}
              icon={<SaveFilled />}
            />
            <IconButton
              style={{ backgroundColor: "#ffffff" }}
              onClick={handleCancelEdit}
              icon={<CloseCircleFilled />}
            />
          </>
        ) : (
          <IconButton
            color="primary"
            variant="outlined"
            onClick={handleEditTitle}
            icon={<EditFilled />}
          />
        )}
        <IconButton
          color="danger"
          variant="solid"
          onClick={handleDelete}
          icon={<DeleteFilled />}
        />
      </Flex>
    );
  }
);

export default TodoItem;
