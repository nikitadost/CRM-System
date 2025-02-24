import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { UnorderedListOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

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

const Sidebar = React.memo(() => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("");
  const onClick: MenuProps["onClick"] = useCallback(
    (e: { key: React.SetStateAction<string> }) => {
      setCurrent(e.key);
    },
    []
  );
  const path = useMemo(() => {
    return location.pathname.split("/")[1];
  }, [location]);

  useEffect(() => {
    if (path !== current) {
      setCurrent(path);
    }
  }, [path, current, setCurrent]);
  console.log("Sidebar render");
  return (
    <Sider
      collapsible
      collapsed={useMemo(() => collapsed, [collapsed])}
      onCollapse={useCallback(
        (value: boolean | ((prevState: boolean) => boolean)) =>
          setCollapsed(value),
        [setCollapsed]
      )}
    >
      <div className="demo-logo-vertical" />
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        items={useMemo(() => items, [])}
        selectedKeys={[useMemo(() => current, [current])]}
      />
    </Sider>
  );
});

export default Sidebar;
