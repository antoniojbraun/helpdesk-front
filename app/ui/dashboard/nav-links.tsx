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

const styleLinks = "flex items-center space-x-[20px]";

const styleIcons = "size-5 text-[#2C88D9]";
const links = [
  {
    name: "Usuários",
    href: "/dashboard/users",
    icon: UserIcon,
  },
  {
    name: "Chamados",
    href: "/dashboard/tickets",
    icon: ListBulletIcon,
  },
  {
    name: "Salas",
    href: "/dashboard/rooms",
    icon: HomeIcon,
  },
  ,
  {
    name: "Ajuda",
    href: "/dashboard/help-page",
    icon: InformationCircleIcon,
  },
];

export default function Navlinks() {
  const { isSidebarOpen } = useSidebarContext();
  const pathname = usePathname();
  return (
    <div className="space-y-[7px]">
      {links.map((link, index) => {
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
    </div>
  );
}
