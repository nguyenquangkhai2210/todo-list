import React from "react";

type Props = {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}
const Button = ({
  type,
  onClick,
  children
}: Props) => {
  return (
    <button className={type === "del" ? "Todo__delete" : "Action__btn"} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "primary"
}

export default React.memo(Button);
