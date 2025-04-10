import {
  Button,
  Flex,
  GetProps,
  Input,
  Layout,
  Modal,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { User } from "../../types/types";
import { useEffect, useState } from "react";
import {
  blockUserByAdmin,
  getUsersByAdmin,
  removeUserByAdmin,
  unblockUserByAdmin,
  UserFilters,
} from "../../api/UsersApi";
import {
  LockOutlined,
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { SorterResult } from "antd/es/table/interface";
import { useNavigate } from "react-router";
import Search from "antd/es/input/Search";
type SearchProps = GetProps<typeof Input.Search>;
type ActionType = "delete" | "block" | "unblock";
const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<UserFilters>({
    sortBy: "id",
    sortOrder: "asc",
    limit: 20,
    offset: page - 1,
    search: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFunction, setModalFunction] = useState<() => Promise<void>>();
  const [modalData, setModalData] = useState<User>();
  const [actionType, setActionType] = useState<ActionType>("delete");

  const showModal = (
    user: User,
    actionFunction: () => Promise<void>,
    type: ActionType
  ) => {
    console.log(user, actionFunction, type);
    setModalFunction(() => actionFunction);
    setActionType(type);
    setModalData(user);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalFunction) {
      await modalFunction();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getModalText = (action: ActionType) => {
    switch (action) {
      case "delete":
        return `Are you sure you want to delete the user: ${modalData?.username}?`;
      case "block":
        return `Are you sure you want to block the user: ${modalData?.username}?`;
      case "unblock":
        return `Are you sure you want to unblock the user: ${modalData?.username}?`;
      default:
        return "";
    }
  };
  const onSearch: SearchProps["onSearch"] = (value: string) => {
    const newFilter: UserFilters = {
      ...filter,
      search: value,
    };
    setFilter(newFilter);
  };

  const fetchUsers = async (filters: UserFilters) => {
    setLoading(true);
    try {
      const response = await getUsersByAdmin(filters);
      if (response && response.data) {
        setDataSource(response.data.data);
        setTotal(response.data.meta.totalAmount);
      }
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(filter);
  }, [filter]);

  const handleRemoveUser = async (id: number) => {
    await removeUserByAdmin(id);
    fetchUsers(filter);
  };
  const handleBlockUser = async (id: number) => {
    await blockUserByAdmin(id);
    fetchUsers(filter);
  };
  const handleUnblockUser = async (id: number) => {
    await unblockUserByAdmin(id);
    fetchUsers(filter);
  };

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const currentPage = pagination.current ? pagination.current : 1;
    let sortBy = filter.sortBy;
    let sortOrder = filter.sortOrder;
    if (Array.isArray(sorter) && sorter.length > 0) {
      const firstSorter = sorter[0];
      sortBy = firstSorter.field as string;
      sortOrder = firstSorter.order
        ? firstSorter.order === "ascend"
          ? "asc"
          : "desc"
        : "asc";
    } else if (sorter && (sorter as SorterResult<User>).field) {
      sortBy = (sorter as SorterResult<User>).field as string;
      sortOrder = (sorter as SorterResult<User>).order
        ? (sorter as SorterResult<User>).order === "ascend"
          ? "asc"
          : "desc"
        : "asc";
    }
    setPage(currentPage);
    const newFilter: UserFilters = {
      ...filter,
      offset: currentPage - 1,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };

    if (filters.isBlocked === null) {
      delete newFilter.isBlocked;
    } else {
      const isBlockedFilter = new Set(filters.isBlocked as string[]);
      if (
        isBlockedFilter.has("all") ||
        (isBlockedFilter.has("blocked") && isBlockedFilter.has("active"))
      ) {
        delete newFilter.isBlocked;
      } else if (isBlockedFilter.has("blocked")) {
        newFilter.isBlocked = true;
      } else if (isBlockedFilter.has("active")) {
        newFilter.isBlocked = false;
      }
    }
    setFilter(newFilter);
  };

  const columns: TableColumnsType<User> = [
    { key: "username", title: "Username", dataIndex: "username", sorter: true },
    { key: "email", title: "Email", dataIndex: "email", sorter: true },
    {
      key: "date",
      title: "Registration Date",
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
      title: "Blocked",
      dataIndex: "isBlocked",
      filters: [
        { text: "All users", value: "all" },
        { text: "Blocked users", value: "blocked" },
        { text: "Active users", value: "active" },
      ],
      render: (isBlocked: boolean) => {
        return <p>{isBlocked ? "Yes" : "No"}</p>;
      },
    },
    {
      key: "roles",
      title: "Roles",
      dataIndex: "roles",
      render: (roles: string[]) => roles?.join(", "),
    },
    { key: "phoneNumber", title: "Phone Number", dataIndex: "phoneNumber" },
    {
      title: "",
      key: "actions",
      render: (record) => (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(`/users/${record.id}`)}
          >
            <EditFilled />
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() =>
              showModal(record, () => handleRemoveUser(record.id), "delete")
            }
          >
            <DeleteFilled />
          </Button>
          {record.isBlocked ? (
            <Button
              onClick={() =>
                showModal(record, () => handleUnblockUser(record.id), "unblock")
              }
            >
              <UnlockOutlined style={{ color: "green" }} />
            </Button>
          ) : (
            <Button
              color="danger"
              onClick={() =>
                showModal(record, () => handleBlockUser(record.id), "block")
              }
            >
              <LockOutlined style={{ color: "red" }} />
            </Button>
          )}
          <Button>
            <UserAddOutlined style={{ color: "green" }} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{ height: "100%", gap: "20px", fontSize: "20px" }}
      >
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: "100%", padding: "20px" }}
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onChange={handleTableChange}
          rowKey="id"
          pagination={{
            total: total,
            pageSize: 20,
            current: page,
          }}
        />
      </Flex>
      <Modal
        title="Confirm Action"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{getModalText(actionType)}</p>
      </Modal>
    </Layout>
  );
};

export default UsersPage;
