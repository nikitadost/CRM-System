import { Flex, Layout } from "antd";
import { Outlet } from "react-router";
import illustrationMedium from "/images/auth/illustrationMedium.svg";

const AuthLayout = () => {
  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        style={{ height: "100%", width: "100%" }}
      >
        <img
          className="illustration"
          src={illustrationMedium}
          alt="illustration"
        />
        <Outlet />
      </Flex>
    </Layout>
  );
};

export default AuthLayout;
