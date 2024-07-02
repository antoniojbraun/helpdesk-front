import {
  UserIcon,
  ListBulletIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const LinksAdmin = [
  {
    title: "Lista Todos os Usuários Admin",
    name: "Usuários",
    href: "/dashboard/admin/users",
    icon: UserIcon,
    userType: "admin",
  },
  {
    title: "Lista Todos os Chamados Admin",
    name: "Chamados",
    href: "/dashboard/admin/tickets",
    icon: ListBulletIcon,
    userType: "admin",
  },

  {
    title: "Lista salas Suporte",
    name: "Salas",
    href: "/dashboard/support/rooms",
    icon: HomeIcon,
    userType: "support, admin",
  },
];
