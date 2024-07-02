import {
  UserIcon,
  ListBulletIcon,
  HomeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const LinksSupport = [
  {
    title: "Lista chamados Suporte",
    name: "Chamados",
    href: "/dashboard/support/tickets",
    icon: ListBulletIcon,
    userType: "support",
  },
  {
    title: "Fila chamados Pendentes",
    name: "Fila de Pendentes",
    href: "/dashboard/support/tickets/pending",
    icon: ListBulletIcon,
    userType: "support",
  },
  {
    title: "Lista salas Suporte",
    name: "Salas",
    href: "/dashboard/support/rooms",
    icon: HomeIcon,
    userType: "support, admin",
  },
  ,
  {
    title: "Página Ajuda Sporte",
    name: "Ajuda",
    href: "/dashboard/support/help-page",
    icon: InformationCircleIcon,
    userType: "support",
  },
];
