import React from "react";
import illustrationMedium from "/images/auth/illustrationMedium.svg";
import logo from "../../../public/images/auth/logo.svg";
import { Button, Checkbox, Form, Input, Flex, notification, Space } from "antd";
import "./AuthorizationPage.css";
import { Link } from "react-router";
import { fetchSignIn, AuthData } from "../../api/AuthApi";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

interface AuthForm {
  login: string;
  password: string;
  remember: boolean;
}

const AuthorizationPage = React.memo(() => {
  console.log("AuthorizationPage render");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = <Space></Space>;
    api.open({
      message: "Successful Authorization",
      btn,
      key,
      onClose: close,
    });
  };
  const onFinish = async (value: AuthForm) => {
    const authorization: AuthData = {
      login: value.login,
      password: value.password,
    };
    try {
      await fetchSignIn(authorization);
      openNotification();
    } catch (err) {
      console.log("Не удалось авторизироваться", err);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100%", width: "100%" }}
    >
      {contextHolder}
      <img
        className="illustration"
        src={illustrationMedium}
        alt="illustration"
      />

      <Flex
        align="center"
        justify="center"
        vertical
        style={{ width: "100%", gap: "36px" }}
      >
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
            <h1 className="login-tittle">Login to your Account</h1>
            <h2 className="login-subtittle">
              See what is going on with your business
            </h2>
          </Flex>

          <Form
            className="login-container"
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <span className="login-input-text">Login</span>
            <Form.Item
              name="login"
              rules={[
                { required: true, message: "Please input your Login!" },
                {
                  pattern: /^[a-zA-Z]{2,60}$/,
                  message: "Field must contain 2-60 Latin alphabet characters.",
                },
              ]}
              hasFeedback
            >
              <Input type="login" placeholder="admin12345" />
            </Form.Item>
            <span className="login-input-text">Password</span>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },

                {
                  min: 6,
                  message: "Password should be between 6 and 60 characters.",
                },
                {
                  max: 60,
                  message: "Password should be between 6 and 60 characters.",
                },
              ]}
              hasFeedback
            >
              <Input type="password" placeholder="*****************" />
            </Form.Item>

            <Flex justify="space-between" align="center">
              <Checkbox type="rememder" className="registration-checkbox">
                Remember Me
              </Checkbox>
              <a href="">Forgot password?</a>
            </Flex>

            <Form.Item>
              <Button
                className="login-btn"
                block
                type="primary"
                htmlType="submit"
              >
                <span className="login-btn-text">Login</span>
              </Button>
            </Form.Item>
          </Form>
        </Flex>
        <span style={{ flex: "center" }}>
          Not Registered Yet?
          <Link to="/registration">Create an account</Link>
        </span>
      </Flex>
    </Flex>
  );
});

export default AuthorizationPage;
