import Pagination from "@/app/ui/dashboard/pagination";
import Table from "@/app/ui/dashboard/tickets/table";
import SearchBar from "@/app/ui/dashboard/tickets/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import {
  getAllTickets,
  getAllTicketsSupportAPI,
} from "@/app/lib/tickets/servicesticket";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/servicesgenerics";
import { TicketByUser } from "@/app/lib/definitions";
import { getDataSession } from "@/app/lib/utils";

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
    room: {
      id: "",
      name: "",
      description: "",
    },
    status: "",
    createdAt: "",
  };
  const getDataUserLogged = await getDataSession();

  const dataFetch = {
    userId: getDataUserLogged?.id,
    token: getDataUserLogged?.token,
  };
  const getAllTicketsAPIWithToken = getAllTicketsSupportAPI.bind(
    null,
    dataFetch
  );

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await HowManyPagesGeneric(
    getAllTicketsAPIWithToken,
    query
  );
  const tickets = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllTicketsAPIWithToken,
    ticket
  );

  return (
    <div className="flex flex-col">
      <TopbarContentPage titlePage="Meus Chamados" />
      <SearchBar />
      <Table data={tickets} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
