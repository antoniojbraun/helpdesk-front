import {
  UserIcon,
  ListBulletIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const LinksUser = [
  {
    title: "Fila Chamados Usuário",
    name: "Chamados User",
    href: "/dashboard/user/tickets",
    icon: ListBulletIcon,
    userType: "user",
  },

  {
    title: "Página Ajuda Usuário",
    name: "Ajuda",
    href: "/dashboard/user/help-page",
    icon: InformationCircleIcon,
    userType: "user",
  },
];
