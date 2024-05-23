"use client";
import React from "react";
import HamburguerIcon from "./hamburguerIcon";
import { useSidebarContext } from "@/app/context/SidebarContext";
import Person from "./person";
import Logo from "./helpdesk-logo";

export default function TopBar() {
  const { toggleSidebar } = useSidebarContext();
  return (
    <div className="flex items-center justify-between px-[12px] border border-b-[#2C88D9]/50 ">
      <div className="flex space-x-[9px]">
        <HamburguerIcon onClick={() => toggleSidebar()} />
        <Logo />
      </div>
      <Person />
    </div>
  );
}
