import { Flex, Layout, TableProps } from "antd";
import { ModalActionType, Roles, User, UserFilters } from "../../types/types";
import { useCallback, useEffect, useState } from "react";
import {
  blockUser,
  getUsers,
  removeUser,
  unblockUser,
  updateUserRoles,
} from "../../api/UsersApi";
import { SorterResult } from "antd/es/table/interface";
import UserActionModal from "../../components/UserActionModal/UserActionModal";
import UsersSearch from "../../components/UsersSearch/UsersSearch";
import UsersTable from "../../components/UsersTable/UsersTable";

const UsersPage: React.FC = () => {
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

  const [modalUser, setModalUser] = useState<User | null>(null);
  const [modalAction, setModalAction] = useState<ModalActionType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (user: User, action: ModalActionType) => {
    setModalUser(user);
    setModalAction(action);
    setModalVisible(true);
  };

  const onSearchChange = useCallback(
    (search: string) => {
      setFilter((prev) => ({
        ...prev,
        search,
      }));
    },
    [setFilter]
  );

  const handleActionModal = async (roles?: Roles[]) => {
    if (!modalUser || !modalAction) return;

    switch (modalAction) {
      case "rights":
        if (roles) {
          await updateUserRoles(modalUser.id, roles);
        }
        break;
      case "delete":
        await removeUser(modalUser.id);
        break;
      case "block":
        await blockUser(modalUser.id);
        break;
      case "unblock":
        await unblockUser(modalUser.id);
        break;
    }

    await fetchUsers(filter);
  };

  const fetchUsers = async (filters: UserFilters) => {
    setLoading(true);
    try {
      const response = await getUsers(filters);
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

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{ height: "100%", gap: "20px", fontSize: "20px" }}
      >
        <UsersSearch onSearchChange={onSearchChange} />
        <UsersTable
          dataSource={dataSource}
          loading={loading}
          page={page}
          total={total}
          onChange={handleTableChange}
          onAction={showModal}
        />
      </Flex>
      <UserActionModal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setModalUser(null);
          setModalAction(null);
        }}
        user={modalUser}
        action={modalAction as ModalActionType}
        onConfirm={handleActionModal}
      />
    </Layout>
  );
};

export default UsersPage;
