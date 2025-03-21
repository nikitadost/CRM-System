import React from "react";
import illustrationMedium from "/images/auth/illustrationMedium.svg";
import logo from "../../../public/images/auth/logo.svg";
import { Button, Flex, Form, Input, notification, Space } from "antd";
import "./RegistrationPage.css";
import { Link } from "react-router";
import { fetchSignUp, UserRegistration } from "../../api/AuthApi";
import { AxiosError } from "axios";

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};
const RegistrationPage = React.memo(() => {
  console.log("RegistrationPage render");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <span>Successful Registration, you can now log in</span>
        <Link to="/authorization">
          <Button>Go Auth</Button>
        </Link>
      </Space>
    );
    api.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: close,
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
      await fetchSignUp(registration);
      openNotification();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "Registration Failed",
          description: `Email or Login has already been used ${error?.response?.data}, ${error.message}`,
        });
      }
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
            style={{ height: "100%", width: "100%" }}
            align="center"
            justify="center"
            vertical
            className="registration-title-container"
          >
            <h1 className="registration-tittle">Register your Account</h1>
            <h2 className="registration-subtittle">
              Increase the efficiency of your business!
            </h2>
          </Flex>

          <Form
            className="registration-container"
            name="registration"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <span className="registration-input-text">Email</span>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="abc@mail.ru" />
            </Form.Item>

            <span className="registration-input-text">Login</span>
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
            <span className="login-input-text">Confirm Password</span>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
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

                ({ getFieldValue }) => ({
                  validator() {
                    if (
                      getFieldValue("confirmPassword") ===
                      getFieldValue("password")
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    }
                  },
                }),
              ]}
              hasFeedback
            >
              <Input type="password" placeholder="*****************" />
            </Form.Item>
            <span className="registration-input-text">Phone Number</span>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: false },
                {
                  pattern: /^\+\d{1,15}$/,
                  message:
                    "Please enter a valid phone number format (+79123456789).",
                },
              ]}
              hasFeedback
            >
              <Input type="phoneNumber" placeholder="+79123456789" />
            </Form.Item>
            <span className="registration-input-text">Username</span>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your User Name!" },
                {
                  pattern: /^[a-zA-Zа-яА-Я]{1,60}$/,
                  message:
                    "Field must contain 1-60 Latin or Cyrillic alphabet characters.",
                },
              ]}
              hasFeedback
            >
              <Input type="username" placeholder="Bogdan Rediron" />
            </Form.Item>

            <Form.Item>
              <Button
                className="registration-btn"
                block
                type="primary"
                htmlType="submit"
              >
                <span className="registration-btn-text">Sign Up</span>
              </Button>
              <span style={{ flex: "center" }}>
                Already Registered?
                <Link to="/authorization">Login</Link>
              </span>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default RegistrationPage;
