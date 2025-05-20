import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../api/UsersApi";
import { User } from "../../types/types";
import { Form, Input, Button, Spin, Flex, Layout } from "antd";
import { useNavigate, useParams } from "react-router";
import {
  emailRules,
  phoneNumberRules,
  usernameRules,
} from "../../utils/validationRules";
import { getChangedFields } from "../../utils/getChangedFields";

const UserEditPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id || isNaN(Number(id))) {
        console.error("Некорректный или отсутствующий ID пользователя");
        navigate("/users");
        return;
      }

      try {
        const data = await getUserProfile(Number(id));
        setUser(data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSaveUser = async () => {
    if (!user) return;

    try {
      const validatedFields = await form.validateFields();

      const fieldsToCompare: (keyof User)[] = [
        "username",
        "email",
        "phoneNumber",
      ];

      const changedValues = getChangedFields(
        user,
        validatedFields,
        fieldsToCompare
      );

      if (Object.keys(changedValues).length > 0) {
        const res = await updateUserProfile(user.id, changedValues);

        if (res) {
          setUser(res);
        } else {
          await form.setFieldsValue({
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
          });
        }
      }

      setIsEditMode(false);
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
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
            label="Имя пользователя"
            name="username"
            rules={usernameRules}
          >
            <Input disabled={!isEditMode} value={user?.username} />
          </Form.Item>
          <Form.Item label="Почта" name="email" rules={emailRules}>
            <Input disabled={!isEditMode} value={user?.email} />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phoneNumber"
            rules={phoneNumberRules}
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
