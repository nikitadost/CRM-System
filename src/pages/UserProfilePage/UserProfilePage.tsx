import { Flex } from "antd";
import React from "react";

const UserProfilePage = React.memo(() => {
  console.log("UserProfilePage render");
  return (
    <Flex align="center" justify="center" vertical style={{ height: "100%" }}>
      <h1>Привет</h1>
    </Flex>
  );
});

export default UserProfilePage;
