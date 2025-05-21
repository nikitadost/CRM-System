import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  UnorderedListOutlined,
  ProfileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Roles, User } from "../../types/types";
import { getUserProfile } from "../../api/AuthApi";
import { setUser } from "../../redux/UserSlice";

type MenuItem = Required<MenuProps>["items"][number];

const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);
  const hasAdvancedAccess =
    user?.roles?.some(
      (role) => role === Roles.ADMIN || role === Roles.MODERATOR
    ) ?? false;

  const [collapsed, setCollapsed] = useState(false);
  const currentPath = location.pathname.replace(/\//g, "") || "todolist";
  const [current, setCurrent] = useState(currentPath);

  const searchParams = new URLSearchParams(location.search);
  const currentFilter = searchParams.get("filter") || "all";

  useEffect(() => {
    async function fetchUser() {
      try {
        const userProfile: User = await getUserProfile();
        dispatch(setUser(userProfile));
      } catch (error) {
        console.error("Ошибка загрузки профиля пользователя:", error);
      }
    }
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (current !== currentPath) {
      setCurrent(currentPath);
    }
  }, [currentPath, current]);

  const onClick: MenuProps["onClick"] = (e) => {
    const key = e.key;

    if (key === current) return;

    if (key === "todolist") {
      if (!searchParams.has("filter")) {
        searchParams.set("filter", "all");
      }
      navigate(`/todolist?${searchParams.toString()}`);
    } else if (key === "user-profile") {
      navigate(`/user-profile?filter=${currentFilter}`);
    } else if (key === "users") {
      navigate(`/users?filter=${currentFilter}`);
    } else {
      navigate(`/${key}`);
    }

    setCurrent(key);
  };

  const baseItems: MenuItem[] = [
    { key: "todolist", label: "Список дел", icon: <UnorderedListOutlined /> },
    { key: "user-profile", label: "Профиль", icon: <ProfileOutlined /> },
  ];

  const advancedAccessItems: MenuItem = {
    key: "users",
    label: "Пользователи",
    icon: <PieChartOutlined />,
  };

  const items = hasAdvancedAccess
    ? baseItems.concat(advancedAccessItems)
    : baseItems;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={[current]}
        onClick={onClick}
      />
    </Sider>
  );
};

export default MainMenu;
