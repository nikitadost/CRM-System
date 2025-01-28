import EditIcon from "../../UI/Icons/EditIcon";
import SaveIcon from "../../UI/Icons/SaveIcon";
import BtnCancel from "../BtnCancel/BtnCancel";

interface BtnEditProps {
  handleEditTitle: () => void;
  isEditMode: boolean;
  handleCancelEdit: () => void;
}

const BtnEdit: React.FC<BtnEditProps> = ({
  handleEditTitle,
  isEditMode,
  handleCancelEdit,
}) => {
  return (
    <div className="edit-btns">
      <button className="edit-btn" onClick={handleEditTitle}>
        {isEditMode ? <SaveIcon /> : <EditIcon />}
      </button>
      {isEditMode ? <BtnCancel handleCancelEdit={handleCancelEdit} /> : null}
    </div>
  );
};

export default BtnEdit;
