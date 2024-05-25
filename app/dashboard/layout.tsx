"use client";

import { SidebarProvider } from "../context/SidebarContext";
import Footer from "../ui/dashboard/footerLayout";
import Sidebar from "../ui/dashboard/sidebarLayout";
import TopBar from "../ui/dashboard/topbarLayout";

let topBar = ''
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TopBar />
      <div className="flex flex-row min-h-[calc(100vh-144px)]">
        <Sidebar />
        <div className="flex-grow p-[30px] bg-[#F9FAFB] ">{children}</div>
      </div>
      <Footer />
    </SidebarProvider>
  );
}
