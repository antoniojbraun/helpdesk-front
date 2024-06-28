import Pagination from "@/app/ui/dashboard/pagination";
import Table from "@/app/ui/dashboard/tickets/table";
import SearchBar from "@/app/ui/dashboard/tickets/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import { getAllTickets } from "@/app/lib/tickets/servicesticket";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/utils";
import { TicketByUser } from "@/app/lib/definitions";

const Page = async ({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) => {
  const ticket: TicketByUser = {
    id: "",
    number: 0,
    title: "",
    description: "",
    room: "",
    status: "",
    createdAt: "",
  };

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await HowManyPagesGeneric(getAllTickets, query);
  const tickets = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllTickets,
    ticket
  );

  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Meus Chamados"
        titleButton="Criar Chamado"
        urlButton="/dashboard/tickets/create"
      />
      <SearchBar />
      <Table data={tickets} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;