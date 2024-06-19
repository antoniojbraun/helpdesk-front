interface handleToggleMessages {
  (): void;
}

export default function toggleDescriptionDataTicket({
  isActive,
  handleToggle,
  children,
}: {
  isActive: boolean;
  handleToggle: handleToggleMessages;
  children: string;
  }) {
  
  const styleButtonDivActive =
    "flex justify-center w-full h-full bg-[#4B5C6B] text-[#F0F1F3] p-[10px] rounded-sm cursor-pointer";
  const styleButtonDivInactive =
    "flex justify-center w-full h-full bg-[#C2CFD9] text-[#4A5865] p-[10px] rounded-sm cursor-pointer";

  const classButton = isActive ? styleButtonDivActive : styleButtonDivInactive;

  return (
    <div className={classButton} onClick={handleToggle}>
      {children}
    </div>
  );
}
