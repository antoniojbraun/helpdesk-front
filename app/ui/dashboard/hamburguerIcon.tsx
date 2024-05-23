import React from "react";
import { useSidebarContext } from "@/app/context/SidebarContext";

interface HamburguerIconProps {
  onClick: () => void;
}

export default function HamburgerIcon({ onClick }: HamburguerIconProps) {
  const bars =
    "w-[22px] h-[2.6px] my-[5px] transition-all bg-[#2C88D9]";
  const bar1Clicked =
    " origin-center translate-x-0 translate-y-[6px] rotate-45";
  const bar2Clicked = " bg-opacity-0";
  const bar3Clicked =
    " origin-center translate-x-0 -translate-y-[9px] -rotate-45";
  const { isSidebarOpen } = useSidebarContext();
  
  return (
    <div
      className="py-[6px] my-[2px] px-[10px] hover:bg-[#D5E6F7] rounded-xl cursor-pointer active:bg-opacity-50"
      onClick={onClick}>
      <div className={bars}></div>
      <div className={bars}></div>
      <div className={bars} ></div>
      {/* <div className={isSidebarOpen ? bars + bar1Clicked : bars}></div>
      <div className={isSidebarOpen ? bars + bar2Clicked : bars}></div>
      <div className={isSidebarOpen ? bars + bar3Clicked : bars}></div> */}
    </div>
  );
}
