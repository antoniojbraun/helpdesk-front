import Breadcrumbs from "../../../../ui/dashboard/breadcrumbs";
import FormCreateTicket from "@/app/ui/dashboard/tickets/form";
import { getAllRooms, getAllRoomsAPI } from "@/app/lib/rooms/servicesrooms";
import { getDataSession } from "@/app/lib/utils";
export default async function CreateTicket() {
  const session = await getDataSession();
  const dataFetch = {
    token: session?.token,
    userId: session?.id,
  };
  const listOfRooms = await getAllRoomsAPI(dataFetch);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: "/dashboard/user/tickets" },
          {
            label: "Criar um chamado",
            href: "/dashboard/user/tickets/create",
            active: true,
          },
        ]}
      />
      <FormCreateTicket listofrooms={listOfRooms} userid={dataFetch.userId} />
    </main>
  );
}
