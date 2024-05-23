"use client";

import { SidebarProvider } from "../context/SidebarContext";
import Footer from "../ui/dashboard/footer";
import Sidebar from "../ui/dashboard/sidebar";
import TopBar from "../ui/dashboard/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col md:overflow-hidden">
        <TopBar />
        <div className="flex flex-row">
          <Sidebar />

          <div className="flex-grow p-[20px] bg-[#F8F9FA] ">{children}</div>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
