import SearchBar from "@/app/ui/dashboard/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import Pagination from "@/app/ui/dashboard/pagination";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/utils";
import { getAllRooms } from "@/app/lib/rooms/servicesrooms";
import TableRooms from "@/app/ui/dashboard/rooms/table";
import { Room } from "@/app/lib/definitions";
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) {
  const room: Room = {
    id: "",
    name: "",
    description: "",
  };
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await HowManyPagesGeneric(getAllRooms, query);
  const rooms = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllRooms,
    room
  );
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Salas"
        titleButton="Criar Sala"
        urlButton="/dashboard/rooms/create"
      />
      <SearchBar />
      <TableRooms data={rooms} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
