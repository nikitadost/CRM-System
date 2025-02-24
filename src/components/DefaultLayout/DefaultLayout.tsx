import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import React from "react";

const DefaultLayout: React.FC = React.memo(() => {
  console.log("DefaultLayout render");
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          CRM APP ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
});

export default DefaultLayout;
