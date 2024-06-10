import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import FormCreateTicket from "@/app/ui/dashboard/tickets/form";
export default function CreateTicket() {
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
      <FormCreateTicket />
    </main>
  );
}
