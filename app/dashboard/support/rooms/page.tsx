import SearchBar from "@/app/ui/dashboard/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import Pagination from "@/app/ui/dashboard/pagination";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/servicesgenerics";
import { getAllRooms, getAllRoomsAPI } from "@/app/lib/rooms/servicesrooms";
import TableRooms from "@/app/ui/dashboard/rooms/table";
import { Room } from "@/app/lib/definitions";
import { getDataSession } from "@/app/lib/utils";
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) {
  const getDataUserLogged = await getDataSession();
  const dataFetch = {
    token: getDataUserLogged?.token,
    userId: getDataUserLogged?.id,
  };
  const getAllRoomsWithToken = getAllRoomsAPI.bind(null, dataFetch);
  const room: Room = {
    id: "",
    name: "",
    description: "",
  };
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await HowManyPagesGeneric(getAllRoomsWithToken, query);
  const rooms = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllRoomsWithToken,
    room
  );
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Salas"
        titleButton="Criar Sala"
        urlButton="/dashboard/support/rooms/create"
      />
      <SearchBar />
      <TableRooms data={rooms} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
