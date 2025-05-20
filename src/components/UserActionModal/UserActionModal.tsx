import { Modal, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { ModalActionType, Roles, User } from "../../types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  action: ModalActionType;
  onConfirm: (roles?: Roles[]) => Promise<void>;
}

const UserActionModal: React.FC<Props> = ({
  open,
  onClose,
  user,
  action,
  onConfirm,
}) => {
  const [step, setStep] = useState<"default" | "confirm">("default");
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([]);

  useEffect(() => {
    if (action === "rights" && user) {
      setSelectedRoles(user.roles);
      setStep("default");
    }
  }, [user, action]);

  const handleOk = async () => {
    if (action === "rights" && step === "default") {
      setStep("confirm");
      return;
    }

    try {
      await onConfirm(selectedRoles);
      onClose();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const getText = () => {
    switch (action) {
      case "delete":
        return `Удалить пользователя: ${user?.username}?`;
      case "block":
        return `Заблокировать пользователя: ${user?.username}?`;
      case "unblock":
        return `Разблокировать пользователя: ${user?.username}?`;
      case "rights":
        return `Подтвердите изменение ролей для: ${user?.username}`;
      default:
        return "";
    }
  };

  return (
    <Modal
      title="Подтвердить действие"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      {action === "rights" && step === "default" ? (
        <>
          <p>
            Выберите роли для пользователя <b>{user?.username}</b>:
          </p>
          <Checkbox.Group
            options={[Roles.USER, Roles.MODERATOR, Roles.ADMIN]}
            value={selectedRoles}
            onChange={(checkedValues) =>
              setSelectedRoles(checkedValues as Roles[])
            }
          />
        </>
      ) : (
        <>
          <p>{getText()}</p>
          {action === "rights" && step === "confirm" && (
            <p>Роли: {selectedRoles.join(", ")}</p>
          )}
        </>
      )}
    </Modal>
  );
};

export default UserActionModal;
