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
import { useUserSession } from "@/app/context/SessionContext";

const styleIcons = "size-5 text-[#2C88D9]";
const links = [
  {
    title: "Lista Todos os Usuários Admin",
    name: "Usuários",
    href: "/dashboard/admin/users",
    icon: UserIcon,
    userType: "administrador",
  },
  {
    title: "Lista Todos os Chamados Admin",
    name: "Chamados",
    href: "/dashboard/admin/tickets",
    icon: ListBulletIcon,
    userType: "administrador",
  },
  {
    title: "Lista chamados Suporte",
    name: "Chamados",
    href: "/dashboard/support/tickets",
    icon: ListBulletIcon,
    userType: "suporte",
  },
  {
    title: "Fila chamados Pendentes",
    name: "Fila de Pendentes",
    href: "/dashboard/support/tickets/pending",
    icon: ListBulletIcon,
    userType: "suporte",
  },
  {
    title: "Fila Chamados Usuário",
    name: "Chamados User",
    href: "/dashboard/user/tickets",
    icon: ListBulletIcon,
    userType: "usuário",
  },
  {
    title: "Lista salas Suporte",
    name: "Salas",
    href: "/dashboard/support/rooms",
    icon: HomeIcon,
    userType: "suporte, administrador",
  },
  ,
  {
    title: "Página Ajuda Sporte",
    name: "Ajuda",
    href: "/dashboard/support/help-page",
    icon: InformationCircleIcon,
    userType: "suporte",
  },
  {
    title: "Página Ajuda Usuário",
    name: "Ajuda",
    href: "/dashboard/user/help-page",
    icon: InformationCircleIcon,
    userType: "usuário",
  },
];

export default function Navlinks() {
  const { isSidebarOpen } = useSidebarContext();
  const pathname = usePathname();
  const data = useUserSession();
  let dadosSession = {
    user: {
      id: "",
      name: "",
      role: "",
      token: "",
      expirationDate: "",
    },
  };
  let userType = "";
  let jaVai = false;
  let newLinks;

  if (data) {
    dadosSession = JSON.parse(data);
    userType =
      dadosSession.user.role == "2"
        ? "administrador"
        : dadosSession.user.role == "1"
        ? "suporte"
        : dadosSession.user.role == "0"
        ? "usuário"
        : "";

    jaVai = true;
    newLinks = links.filter((item) =>
      item?.userType.includes(userType.toLowerCase())
    );
  }
  return (
    <div className="space-y-[7px]">
      {newLinks &&
        newLinks.map((link, index) => {
          const LinkIcon = link!.icon;
          if (jaVai) {
            return (
              <Link
                key={index}
                href={link!.href}
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
          }
        })}
      <SignOutButton isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
