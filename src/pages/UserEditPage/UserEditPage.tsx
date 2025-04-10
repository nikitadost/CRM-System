import React, { useEffect, useState } from "react";
import {
  getUserProfileByAdmin,
  updateUserProfileByAdmin,
} from "../../api/UsersApi";
import { User } from "../../types/types";
import { Form, Input, Button, Spin, Flex, Layout } from "antd";
import { useNavigate, useParams } from "react-router";

const UserEditPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfileByAdmin(Number(id));
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSaveUser = async () => {
    if (user) {
      try {
        const validatedField = await form.validateFields();
        const fieldsToCompare: (keyof User)[] = [
          "username",
          "email",
          "phoneNumber",
        ];
        const changedValues = fieldsToCompare.reduce((acc, key) => {
          if (validatedField[key] !== user[key]) {
            acc[key] = validatedField[key];
          }
          return acc;
        }, {} as Partial<User>);
        if (Object.keys(changedValues).length > 0) {
          const res = await updateUserProfileByAdmin(user.id, changedValues);
          if (res) {
            setUser(res);
          } else {
            await form.setFieldsValue({
              username: user?.username,
              phoneNumber: user?.phoneNumber,
              email: user?.email,
            });
          }
        }
        setIsEditMode(false);
      } catch (error) {
        console.error("Ошибка при обновлении данных пользователя:", error);

        throw error;
      }
    }
  };

  const handleEditUser = () => {
    setIsEditMode(true);
  };

  const handleCancelEditUser = async () => {
    await form.setFieldsValue({
      username: user?.username,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
    });
    setIsEditMode(false);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{ height: "100%", gap: "20px", fontSize: "20px" }}
      >
        <Button onClick={() => navigate("/users")}>Назад</Button>
        <Form
          form={form}
          initialValues={user}
          layout="vertical"
          style={{ width: "50%", margin: "0 auto" }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your User Name!" },
              {
                pattern: /^[a-zA-Zа-яА-Я]{1,60}$/,
                message:
                  "Field must contain 1-60 Latin or Cyrillic alphabet characters.",
              },
            ]}
          >
            <Input disabled={!isEditMode} value={user?.username} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              {
                type: "email",
              },
            ]}
          >
            <Input disabled={!isEditMode} value={user?.email} />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: false },
              {
                pattern: /^\+\d{1,15}$/,
                message:
                  "Please enter a valid phone number format (+79123456789).",
              },
            ]}
          >
            <Input disabled={!isEditMode} value={user?.phoneNumber} />
          </Form.Item>
        </Form>
        <Flex>
          {isEditMode ? (
            <>
              <Button type="primary" htmlType="submit" onClick={handleSaveUser}>
                Save
              </Button>
              <Button onClick={handleCancelEditUser}>Cancel</Button>
            </>
          ) : (
            <Button color="primary" variant="outlined" onClick={handleEditUser}>
              Edit
            </Button>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default UserEditPage;
