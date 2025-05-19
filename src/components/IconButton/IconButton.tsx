import { Button, ButtonProps } from "antd";
import { ReactElement } from "react";
import { IconBaseProps } from "@ant-design/icons/lib/components/Icon";

interface IconButtonProps extends ButtonProps {
  icon: ReactElement<IconBaseProps>;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, children, ...rest }) => {
  return (
    <Button {...rest}>
      {icon}
      {children}
    </Button>
  );
};

export default IconButton;
