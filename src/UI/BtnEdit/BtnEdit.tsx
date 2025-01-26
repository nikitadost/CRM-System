import EditIcon from "../../UI/Icons/EditIcon";
import SaveIcon from "../../UI/Icons/SaveIcon";

interface BtnEditProps {
  handleEditTitle: () => void;
  isEditMode: boolean;
}

const BtnEdit: React.FC<BtnEditProps> = ({ handleEditTitle, isEditMode }) => {
  return (
    <button className="edit-btn" onClick={handleEditTitle}>
      {isEditMode ? <SaveIcon /> : <EditIcon />}
    </button>
  );
};

export default BtnEdit;
