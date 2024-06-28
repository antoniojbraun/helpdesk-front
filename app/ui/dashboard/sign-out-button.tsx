"use client";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { poppinsRegular } from "../fonts";

export async function signOutButton() {
  await signOut();
}

export const SignOutButton = ({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) => {
  return (
      <button
        className="flex items-center w-full space-x-[18px] py-[6px] px-[15px] hover:bg-[#2C88D9] hover:rounded-lg hover:bg-opacity-15 active:bg-opacity-20"
        onClick={() => signOutButton()}>
        <ArrowLeftStartOnRectangleIcon className="size-5 text-[#2C88D9]" />

        <p
          className={`${
            isSidebarOpen ? "md:hidden" : "hidden "
          } md:block text-[#2C88D9] ${poppinsRegular.className} text-[14px]`}>
          Sair
        </p>
      </button>
  );
};
