import { Layout } from "antd";
import Sidebar from "../Sidebar/Sidebar";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import React from "react";

interface DefaultLayoutProps {
  currentPath: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = React.memo(
  ({ currentPath }) => {
    console.log("DefaultLayout render");
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar currentPath={currentPath} />
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
  }
);

export default DefaultLayout;
