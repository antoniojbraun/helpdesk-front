import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import FormCreateTicket from "@/app/ui/dashboard/tickets/form";
import { getAllRooms } from "@/app/lib/rooms/servicesrooms";

export default async function CreateTicket() {
  const listOfRooms = await getAllRooms();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: "/dashboard/tickets" },
          {
            label: "Criar um chamado",
            href: "/dashboard/tickets/create",
            active: true,
          },
        ]}
      />
      <FormCreateTicket listofrooms={listOfRooms} />
    </main>
  );
}
