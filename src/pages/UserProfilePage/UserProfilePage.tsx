import { Button, Flex, Layout } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/AuthSlice";
import { getUserProfile, logoutUser } from "../../api/AuthApi";
import { User } from "../../types/types";
import { clearUser, setUser } from "../../redux/UserSlice";
import { RootState } from "../../redux/store";

const UserProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    dispatch(clearUser());
    navigate("/auth");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile: User = await getUserProfile();
      dispatch(setUser(userProfile));
    };
    fetchUserProfile();
  }, [dispatch]);

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{ height: "100%", gap: "20px", fontSize: "20px" }}
      >
        <span>
          Имя пользователя: <br /> {user?.username}
        </span>
        <span>
          Почтовый адрес: <br />
          {user?.email}
        </span>
        <span>
          Телефон: <br /> {user?.phoneNumber}
        </span>
        <Button onClick={handleLogout}>Выйти</Button>
      </Flex>
    </Layout>
  );
};

export default UserProfilePage;
