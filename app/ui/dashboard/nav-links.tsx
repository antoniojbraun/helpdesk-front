"use client";

import { useSidebarContext } from "@/app/context/SidebarContext";
import Link from "@/node_modules/next/link";
import { usePathname } from "@/node_modules/next/navigation";
import clsx from "clsx";
import {
  UserIcon,
  ListBulletIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { poppinsRegular } from "../fonts";
import { SignOutButton } from "./sign-out-button";
import { useSession } from "next-auth/react";

type DataUser = {
  id: string;
  name: string;
  email: string;
  role: number;
  token: string;
  expirationDate: string;
};

const styleLinks = "flex items-center space-x-[20px]";
const styleIcons = "size-5 text-[#2C88D9]";
const links = [
  {
    name: "Usuários",
    href: "/dashboard/admin/users",
    icon: UserIcon,
    userType: "administrador",
  },
  {
    name: "Meus Chamados",
    href: "/dashboard/support/tickets",
    icon: ListBulletIcon,
    userType: "support, administrador",
  },
  {
    name: "Fila de Pendentes",
    href: "/dashboard/support/tickets/pending",
    icon: ListBulletIcon,
    userType: "support, administrador",
  },
  {
    name: "Chamados User",
    href: "/dashboard/user/tickets",
    icon: ListBulletIcon,
    userType: "user, administrador",
  },
  {
    name: "Salas",
    href: "/dashboard/support/rooms",
    icon: HomeIcon,
    userType: "support, administrador",
  },
  ,
  {
    name: "Ajuda",
    href: "/dashboard/support/help-page",
    icon: InformationCircleIcon,
    userType: "support, administrador",
  },
  {
    name: "Ajuda",
    href: "/dashboard/user/help-page",
    icon: InformationCircleIcon,
    userType: "user, administrador",
  },
];

export default function Navlinks() {
  const { isSidebarOpen } = useSidebarContext();
  const pathname = usePathname();

  const data = useSession();
  const accessToken = data.data?.user;
  let userType = "";

  if (accessToken) {
    userType =
      accessToken.role === 2
        ? "admin"
        : accessToken.role === 1
        ? "support"
        : accessToken.role === 0
        ? "user"
        : "";
  }
  const newLinks = links.filter((item) => item?.userType.includes(userType));
  return (
    <div className="space-y-[7px]">
      {newLinks.map((link, index) => {
        const LinkIcon = link?.icon;
        return (
          <Link
            key={index}
            href={link?.href}
            className={clsx(
              "flex items-center space-x-[18px] py-[6px] px-[15px] hover:bg-[#2C88D9] hover:rounded-lg hover:bg-opacity-15 active:bg-opacity-20",
              {
                "bg-[#2C88D9] rounded-lg bg-opacity-15":
                  pathname === link?.href,
              }
            )}>
            <LinkIcon className={styleIcons} />
            <p
              className={`${
                isSidebarOpen ? "md:hidden" : "hidden "
              } md:block text-[#2C88D9] ${
                poppinsRegular.className
              } text-[14px]`}>
              {link?.name}
            </p>
          </Link>
        );
      })}
      <SignOutButton />
    </div>
  );
}
