import CancelIcon from "../Icons/CancelIcon";

interface ComponentProps {
  handleCancelEdit: () => void;
}

const BtnCancel: React.FC<ComponentProps> = ({ handleCancelEdit }) => {
  return (
    <div className="cancel-btn" onClick={handleCancelEdit}>
      <CancelIcon />
    </div>
  );
};

export default BtnCancel;
