import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import SearchBarUsers from "@/app/ui/dashboard/searchbar";
import Pagination from "@/app/ui/dashboard/pagination";
import Table from "@/app/ui/dashboard/users/table";
import {
  HowManyPagesGeneric,
  fetchFilteredItemsGeneric,
} from "@/app/lib/utils";
import { User } from "@/app/lib/definitions";
import { getAllUsers } from "@/app/lib/users/servicesusers";
import TableUsers from "@/app/ui/dashboard/users/table";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) {
  const user: User = {
    id: "",
    name: "",
    email: "",
    userType: "",
    password: "",
  };

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);
  const totalPages = await HowManyPagesGeneric(getAllUsers, query);
  const users = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllUsers,
    user
  );
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Usuários"
        titleButton="Criar Usuário"
        urlButton="/dashboard/users/create"
      />
      <SearchBarUsers />
      <TableUsers data={users} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
