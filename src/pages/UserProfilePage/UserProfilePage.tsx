import { Flex, Layout } from "antd";
import React from "react";
import MainMenu from "../../components/MainMenu/MainMenu";

const UserProfilePage = React.memo(() => {
  console.log("UserProfilePage");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainMenu />
      <Layout>
        <Flex
          align="center"
          justify="center"
          vertical
          style={{ height: "100%" }}
        >
          <h1>Привет</h1>
        </Flex>
      </Layout>
    </Layout>
  );
});

export default UserProfilePage;
