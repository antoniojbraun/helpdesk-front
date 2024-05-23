"use client";

import { useSidebarContext } from "@/app/context/SidebarContext";
import Logo from "./helpdesk-logo";
import Navlinks from "./nav-linksLayout";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();

  
  
  return (
    <div
      
      className={`flex items-start bg-[#ecf6ff] transition-all`}>
      <div className="p-[10px]">
        <Navlinks />
      </div>
    </div>
  );
}

// ${
//                 isSidebarOpen ? "md:w-[90px]" : "w-[90px]"
//               }
