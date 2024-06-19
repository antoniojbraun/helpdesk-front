"use client";
import { poppins600 } from "../ui/fonts";
import Footer from "../ui/dashboard/footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="border-b-[2px] border-[#2C88D9] p-[7px] w-full">
        <h1
          className={`${poppins600.className} text-[25px] text-[#2C88D9] text-center`}>
          HelpDesk
        </h1>
      </div>
      <div className="flex justify-center p-[20px] min-h-[calc(100vh-153.5px)] w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
