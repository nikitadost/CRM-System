import { Layout } from "antd";
import { Outlet } from "react-router";
import MainMenu from "../MainMenu/MainMenu";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { User } from "../../types/types";
import { getUserProfile } from "../../api/AuthApi";
import { setUser } from "../../redux/UserSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
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

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <MainMenu />

      <Outlet />
    </Layout>
  );
};

export default MainLayout;
