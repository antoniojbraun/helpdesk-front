"use server";

import Pagination from "@/app/ui/dashboard/pagination";
import Table from "@/app/ui/dashboard/tickets/table";
import SearchBar from "@/app/ui/dashboard/tickets/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import {
  getAllTicketsAPI,
  getAllTickets,
} from "@/app/lib/tickets/servicesticket";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/servicesgenerics";
import { TicketByUser } from "@/app/lib/definitions";
import { getDataSession } from "@/app/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) {
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
    token: getDataUserLogged?.token,
    userId: getDataUserLogged?.id,
  };

  const getAllTicketsWithToken = getAllTicketsAPI.bind(null, dataFetch);

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);

  const totalPages = await HowManyPagesGeneric(getAllTicketsWithToken, query);
  const tickets = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllTicketsWithToken,
    ticket
  );
  const hasTicketsToShow: boolean = tickets.length > 0;

  return (
    <div className="flex flex-col">
      <TopbarContentPage titlePage="Chamados" titleButton="Criar Chamado" />
      <SearchBar isActive={hasTicketsToShow} />
      {!hasTicketsToShow && (
        <div className="pl-2 mt-8">
          <p className="text-[18px]">
            Ainda não há chamados criados =(
          </p>
        </div>
      )}

      <Table data={tickets} url="admin" />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
