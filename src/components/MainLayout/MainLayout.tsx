import { Layout } from "antd";
import { Outlet } from "react-router";
import MainMenu from "../MainMenu/MainMenu";

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <MainMenu />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
