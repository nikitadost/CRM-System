import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/AuthSlice";
import { getUserProfile, logoutUser } from "../../api/AuthApi";
import { User } from "../../types/types";
import { clearUser, setUser } from "../../redux/UserSlice";
import { RootState } from "../../redux/store";
import "./UserProfilePage.css";

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
    <div className="user-profile-wrapper">
      <div className="user-profile-content">
        <p>
          <strong>Имя пользователя:</strong> <br /> {user?.username}
        </p>
        <p>
          <strong>Почтовый адрес:</strong> <br /> {user?.email}
        </p>
        <p>
          <strong>Телефон:</strong> <br /> {user?.phoneNumber || "\u00A0"}
        </p>
        <Button className="logout-button" type="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default UserProfilePage;
