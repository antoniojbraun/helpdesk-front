import { off } from "process";
import { Ticket } from "./definitions";

export let tickets = [
  {
    id: "001",
    dt_creation: "02/05/2023",
    title: "Falta Cabo Energia",
    description: "Cabo de energia do PC faltando",
    room: "C8",
    status: "Resolvido",
  },
  {
    id: "002",
    dt_creation: "12/04/2023",
    title: "Problemas datashow",
    description: "Verificar datashow não liga",
    room: "B10",
    status: "Progresso",
  },
  {
    id: "003",
    dt_creation: "15/02/2024",
    title: "Monitor não liga",
    description: "Trocar monitor sala",
    room: "A12",
    status: "Pendente",
  },
  {
    id: "004",
    dt_creation: "02/03/2024",
    title: "Tela Azul",
    description: "PC não sai de tela azul",
    room: "A12",
    status: "Pendente",
  },
  {
    id: "005",
    dt_creation: "10/03/2024",
    title: "Tela piscando",
    description: "Monitor liga mas fica piscando",
    room: "A12",
    status: "Progresso",
  },
  {
    id: "006",
    dt_creation: "02/04/2024",
    title: "Mouse com problemas",
    description: "Botão direito do mouse não está funcionando",
    room: "A12",
    status: "Resolvido",
  },
  {
    id: "007",
    dt_creation: "15/04/2024",
    title: "Instalar Java",
    description: "Precisa instalar o Java no computador",
    room: "E3",
    status: "Pendente",
  },
];
const ITEMS_PER_PAGE = 3;

export function fetchFilteredTickets(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  let filteredTickets = tickets.filter((item) => verifyThisShit(item, query));

  filteredTickets = filteredTickets.filter((item, key) => {
    key >= offset && key <= offset + ITEMS_PER_PAGE;
  });
  
  return filteredTickets;
}

export function fetchSomethingPages(query: string) {
  let filteredTickets = tickets.filter((item) => verifyThisShit(item, query));
  const totalPages = Math.ceil(Number(filteredTickets.length) / ITEMS_PER_PAGE);
  return totalPages;
}

function verifyThisShit(item: Ticket, query: string) {
  if (
    item.id.toLowerCase() == query.toLowerCase() ||
    item.title.toLowerCase() == query.toLowerCase() ||
    item.description.toLowerCase() == query.toLowerCase() ||
    item.status.toLowerCase() == query.toLowerCase() ||
    item.room.toLowerCase() == query.toLowerCase()
  )
    return true;
  return false;
}
