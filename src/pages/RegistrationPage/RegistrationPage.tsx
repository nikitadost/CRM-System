import logo from "../../../public/images/auth/logo.svg";
import { Button, Flex, Form, Input, notification, Space } from "antd";
import "./RegistrationPage.css";
import { Link } from "react-router";
import { registerUser } from "../../api/AuthApi";
import { AxiosError } from "axios";
import { UserRegistration } from "../../types/types";
import {
  confirmPasswordRules,
  emailRules,
  loginRules,
  passwordRules,
  phoneNumberRules,
  usernameRules,
} from "../../utils/validationRules";

const close = () => {
  console.log(
    "Уведомление было закрыто. Либо была нажата кнопка закрытия, либо истекло время действия."
  );
};
const RegistrationPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const openNotification = (
    message: string,
    type: string,
    description: string
  ) => {
    api.destroy();
    const key = `open${Date.now()}`;
    const actions =
      type === "success" ? (
        <Space>
          <Link to="/authorization">
            <Button>Перейти к авторизации</Button>
          </Link>
        </Space>
      ) : (
        <Space></Space>
      );
    api.open({
      message: message,
      actions,
      key,
      onClose: close,
      duration: 0,
      description: description,
    });
  };
  const onFinish = async (values: UserRegistration) => {
    try {
      const registration = {
        login: values.login,
        username: values.username,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      await registerUser(registration);
      openNotification(
        "Успешная регистрация",
        "success",
        "Теперь вы можете войти"
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        openNotification(
          "Регистрация не удалась",
          "error",
          `Электронная почта или логин уже были использованы ${error?.response?.data}, ${error.message}`
        );
      }
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{ width: "100%", gap: "36px" }}
    >
      {contextHolder}
      <Flex
        align="start"
        justify="center"
        vertical
        style={{ height: "100%", width: "420px" }}
      >
        <img className="login-logo" src={logo} alt="logo" />
      </Flex>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{ height: "100%", width: "100%", gap: "36px" }}
      >
        <Flex
          style={{ height: "100%", width: "100%" }}
          align="center"
          justify="center"
          vertical
          className="registration-title-container"
        >
          <h1 className="registration-tittle">Зарегистрируйте свой аккаунт</h1>
          <h2 className="registration-subtittle">
            Повысьте эффективность вашего бизнеса!
          </h2>
        </Flex>

        <Form
          form={form}
          className="registration-container"
          name="registration"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <span className="registration-input-text">Почта</span>
          <Form.Item name="email" rules={emailRules}>
            <Input placeholder="abc@mail.ru" />
          </Form.Item>

          <span className="registration-input-text">Логин</span>
          <Form.Item name="login" rules={loginRules}>
            <Input
              type="text"
              placeholder="admin12345"
              autoComplete="username"
            />
          </Form.Item>

          <span className="login-input-text">Пароль</span>
          <Form.Item name="password" rules={passwordRules}>
            <Input.Password
              type="password"
              placeholder="*****************"
              autoComplete="new-password"
            />
          </Form.Item>
          <span className="login-input-text">Подтвердите пароль</span>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={confirmPasswordRules(form.getFieldValue)}
          >
            <Input.Password
              type="password"
              placeholder="*****************"
              autoComplete="new-password"
            />
          </Form.Item>
          <span className="registration-input-text">Номер телефона</span>
          <Form.Item name="phoneNumber" rules={phoneNumberRules}>
            <Input type="phoneNumber" placeholder="+79123456789" />
          </Form.Item>
          <span className="registration-input-text">Имя пользователя</span>
          <Form.Item name="username" rules={usernameRules}>
            <Input type="username" placeholder="Иван Иванов" />
          </Form.Item>

          <Form.Item>
            <Button
              className="registration-btn"
              block
              type="primary"
              htmlType="submit"
            >
              <span className="registration-btn-text">Зарегистрироваться</span>
            </Button>
            <span style={{ flex: "center" }}>
              Уже зарегистрированы?
              <Link to="/auth/authorization">Войти</Link>
            </span>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default RegistrationPage;
