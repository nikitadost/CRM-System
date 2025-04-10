import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const MainMenu: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);
  const isAdmin = user?.roles.includes(Roles.ADMIN) ? true : false;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile: User = await getUserProfile();
        dispatch(setUser(userProfile));
      } catch (error) {
        console.error("Ошибка загрузки профиля пользователя:", error);
      }
    };
    fetchUserProfile();
  }, [dispatch]);

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
            if (key === "user-profile") {
              navigate(`/user-profile?filter=${currentFilter}`);
            }
            if (key === "users") {
              navigate(`/users?filter=${currentFilter}`);
            }
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

  const items: MenuItem[] = useMemo(
    () => [
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
      ...(isAdmin
        ? [
            {
              key: "users",
              label: "Users",
              icon: <PieChartOutlined />,
            },
          ]
        : []),
    ],
    [isAdmin]
  );

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
