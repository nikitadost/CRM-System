import React from "react";
import { Table, Button, Space } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  LockOutlined,
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { User, ModalActionType, Roles } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface UsersTableProps {
  dataSource: User[];
  loading: boolean;
  page: number;
  total: number;
  onChange: TableProps<User>["onChange"];
  onAction: (user: User, action: ModalActionType) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  dataSource,
  loading,
  page,
  total,
  onChange,
  onAction,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);
  const isAdmin = user?.roles?.includes(Roles.ADMIN) ?? false;

  const columns: TableColumnsType<User> = [
    {
      key: "username",
      title: "Имя пользователя",
      dataIndex: "username",
      sorter: true,
    },
    { key: "email", title: "Почта", dataIndex: "email", sorter: true },
    {
      key: "date",
      title: "Дата регистрации",
      dataIndex: "date",
      render: (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate().toString().padStart(2, "0")}.${(
          dateObj.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}.${dateObj.getFullYear()}`;
      },
    },
    {
      key: "isBlocked",
      title: "Заблокирован",
      dataIndex: "isBlocked",
      filterMultiple: false,
      filters: [
        { text: "All users", value: "all" },
        { text: "Blocked users", value: "blocked" },
        { text: "Active users", value: "active" },
      ],
      render: (isBlocked: boolean) => <p>{isBlocked ? "Да" : "Нет"}</p>,
    },
    {
      key: "roles",
      title: "Роли",
      dataIndex: "roles",
      render: (roles: string[]) => roles?.join(", "),
    },
    { key: "phoneNumber", title: "Номер телефона", dataIndex: "phoneNumber" },
    {
      title: "",
      key: "actions",
      render: (record: User) => (
        <Space>
          <Button
            onClick={() => navigate(`/users/${record.id}`)}
            type="default"
          >
            <EditFilled />
          </Button>

          {isAdmin && (
            <Button danger onClick={() => onAction(record, "delete")}>
              <DeleteFilled />
            </Button>
          )}

          {record.isBlocked ? (
            <Button onClick={() => onAction(record, "unblock")}>
              <UnlockOutlined style={{ color: "green" }} />
            </Button>
          ) : (
            <Button danger onClick={() => onAction(record, "block")}>
              <LockOutlined style={{ color: "red" }} />
            </Button>
          )}
          {isAdmin && (
            <Button onClick={() => onAction(record, "rights")}>
              <UserAddOutlined style={{ color: "green" }} />
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      onChange={onChange}
      rowKey="id"
      pagination={{
        total,
        pageSize: 20,
        current: page,
      }}
    />
  );
};

export default UsersTable;
