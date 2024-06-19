import React from "react";

interface ToggleCreateLoginProps {
  isActive: boolean;
  rounded: string;
  primaryBgColor: string;
  primaryTextColor: string;
  handleToggle: () => void;
}

const ToggleCreateLogin: React.FC<
  React.PropsWithChildren<ToggleCreateLoginProps>
> = ({
  isActive,
  rounded,
  primaryBgColor,
  primaryTextColor,
  handleToggle,
  children,
}) => {
  const styleButtonDivActive = " opacity-100";
  const styleButtonDivInactive = " opacity-65 hover:opacity-85";

  const visibleOrNot = isActive ? styleButtonDivActive : styleButtonDivInactive;

  return (
    <div
      className={`${visibleOrNot} ${rounded} ${primaryBgColor} ${primaryTextColor} p-[10px] cursor-pointer`}
      onClick={handleToggle}>
      {children}
    </div>
  );
};

export default ToggleCreateLogin;
