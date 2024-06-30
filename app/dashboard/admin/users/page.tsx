import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";
import SearchBar from "@/app/ui/dashboard/searchbar";
import TableUsers from "@/app/ui/dashboard/users/table";
import { getAllUsersAPI } from "@/app/lib/users/servicesusers";
import {
  fetchFilteredItemsGeneric,
  HowManyPagesGeneric,
} from "@/app/lib/servicesgenerics";
import { User } from "@/app/lib/definitions";
import { getDataSession } from "@/app/lib/utils";
// Importação dinamica do componente do servidor

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; sort?: string; page?: string };
}) {
  const dataUserLogged = await getDataSession();
  const getAllUsersWithToken = getAllUsersAPI.bind(null, dataUserLogged?.token);

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page || 1);

  const user: User = {
    id: "",
    name: "",
    email: "",
    userType: "",
  };

  const totalPages = await HowManyPagesGeneric(getAllUsersWithToken, query);
  const users = await fetchFilteredItemsGeneric(
    query,
    sort,
    currentPage,
    getAllUsersWithToken,
    user
  );

  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Usuários"
        titleButton="Criar Usuário"
        urlButton="/dashboard/admin/users/create"
      />
      <SearchBar />
      <TableUsers data={users} />
    </div>
  );
}
