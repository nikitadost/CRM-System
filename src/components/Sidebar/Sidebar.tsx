import React, { useState } from "react";
import { Link } from "react-router";
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

interface SidebarProps {
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({ currentPath }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>(currentPath);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key !== current) {
      setCurrent(e.key);
    }
  };

  console.log("Sidebar render");
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
});

export default Sidebar;
