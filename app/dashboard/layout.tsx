"use client";

import { SidebarProvider } from "../context/SidebarContext";
import NavbarMobile from "../ui/dashboard/navbar-mobile";
import Sidebar from "../ui/dashboard/sidebar";
import TopBar from "../ui/dashboard/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TopBar />
      <div className="flex flex-row h-dvh md:overflow-hidden">
        <Sidebar />

        <div className="flex-grow p-[20px] bg-[#F8F9FA] ">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
