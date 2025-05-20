import React from "react";
import logo from "../../../public/images/auth/logo.svg";
import { Button, Checkbox, Form, Input, Flex, notification, Space } from "antd";
import "./AuthorizationPage.css";
import { Link } from "react-router";
import { loginUser } from "../../api/AuthApi";
import { AuthData } from "../../types/types";
import { login } from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { loginRules, passwordRules } from "../../utils/validationRules";

const close = () => {
  console.log(
    "Уведомление было закрыто. Либо была нажата кнопка закрытия, либо истекло время действия."
  );
};

interface AuthForm {
  login: string;
  password: string;
  remember: boolean;
}

const AuthorizationPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const openNotification = (message: string) => {
    api.destroy();
    const key = `open${Date.now()}`;
    api.open({
      message: message,
      actions: <Space></Space>,
      key,
      onClose: close,
      duration: 0,
    });
  };
  const onFinish = async (value: AuthForm) => {
    const authorization: AuthData = {
      login: value.login,
      password: value.password,
    };
    try {
      await loginUser(authorization);
      openNotification("Успешная авторизация");
      dispatch(login());
    } catch (err) {
      console.log(err);
      openNotification("Не удалось авторизоваться");
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
          align="center"
          justify="center"
          vertical
          className="login-title-container"
        >
          <h1 className="login-tittle">Войдите в свою учетную запись</h1>
          <h2 className="login-subtittle">
            Посмотрите, что происходит с вашим бизнесом
          </h2>
        </Flex>

        <Form
          className="login-container"
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <span className="login-input-text">Логин</span>
          <Form.Item name="login" rules={loginRules}>
            <Input
              type="text"
              placeholder="admin12345"
              autoComplete="username"
            />
          </Form.Item>
          <span className="login-input-text">Пароль</span>
          <Form.Item name="password" rules={passwordRules}>
            <Input
              type="password"
              placeholder="*****************"
              autoComplete="current-password"
            />
          </Form.Item>

          <Flex justify="space-between" align="center">
            <Checkbox type="rememder" className="registration-checkbox">
              Запомнить меня
            </Checkbox>
            <a href="">Забыли пароль?</a>
          </Flex>

          <Form.Item>
            <Button
              className="login-btn"
              block
              type="primary"
              htmlType="submit"
            >
              <span className="login-btn-text">Войти</span>
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <span style={{ flex: "center" }}>
        Еще не зарегистрированы?
        <Link to="/auth/registration">Создать аккаунт</Link>
      </span>
    </Flex>
  );
};

export default AuthorizationPage;
