import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { UnorderedListOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "todolist",
    label: <Link to="/todolist">TodoList</Link>,
    icon: <UnorderedListOutlined />,
  },
  {
    key: "user-profile",
    label: <Link to="/user-profile">User Profile</Link>,
    icon: <ProfileOutlined />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setCurrent(path);
  }, [location.pathname]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[current]}
      />
    </Sider>
  );
};

export default Sidebar;
