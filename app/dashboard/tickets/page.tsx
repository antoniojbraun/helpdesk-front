"use client";

import Pagination from "@/app/ui/dashboard/pagination";
import SearchBar from "@/app/ui/dashboard/searchbar";
import Table from "@/app/ui/dashboard/table";
import SearchBarTicket from "@/app/ui/dashboard/tickets/searchbarticket";
import TopbarContentPage from "@/app/ui/dashboard/topbarContentPage";
import { tickets } from "@/app/lib/data";
import { fetchSomethingPages, fetchFilteredTickets } from "@/app/lib/data";

export default function Page() {
  const totalPages = fetchSomethingPages("Progresso");

  console.log(fetchFilteredTickets("Pendente", 1));
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Chamados"
        titleButton="Criar Chamado"
        urlButton="/dashboard/tickets/create"
      />
      <SearchBarTicket />
      <Table tickets={tickets} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
