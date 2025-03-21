import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UnorderedListOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "todolist",
    label: "TodoList",
    icon: <UnorderedListOutlined />,
  },
  {
    key: "user-profile",
    label: "User Profile",
    icon: <ProfileOutlined />,
  },
];

const MainMenu: React.FC = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const currentFilter = useMemo(
    () => searchParams.get("filter") || "all",
    [searchParams]
  );
  const updatedCurrentPath = useMemo(
    () => location.pathname.replace(/\//g, ""),
    [location.pathname]
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>(updatedCurrentPath);

  const onClick: MenuProps["onClick"] = useCallback(
    (e: { key: string }) => {
      const key = e.key;
      setCurrent((prev) => {
        if (prev !== key) {
          if (key === "todolist") {
            if (!searchParams.has("filter")) {
              searchParams.set("filter", "all");
            }
            navigate(`/todolist?${searchParams.toString()}`);
          } else {
            navigate(`/user-profile?filter=${currentFilter}`);
          }
        }
        return key;
      });
    },
    [currentFilter, navigate, searchParams]
  );

  useEffect(() => {
    if (current !== updatedCurrentPath) {
      setCurrent(updatedCurrentPath);
    }
  }, [updatedCurrentPath, current]);
  console.log("MainMenu render");
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
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

export default MainMenu;
