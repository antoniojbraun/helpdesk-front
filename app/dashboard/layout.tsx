"use client";

import { SidebarProvider } from "../context/SidebarContext";
import Footer from "../ui/dashboard/footer";
import Sidebar from "../ui/dashboard/sidebar";
import TopBar from "../ui/dashboard/topbar";

let topBar = ''
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <TopBar />
        <div className="flex flex-row h-[calc(100vh-146px)]">
          <Sidebar />

          <div className="flex-grow p-[20px] bg-[#F8F9FA] ">{children}</div>
        </div>
        <Footer />
    </SidebarProvider>
  );
}
