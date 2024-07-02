import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getTicketById } from "@/app/lib/tickets/servicesticket";
import { getDataSession } from "@/app/lib/utils";
import { getAllMessages } from "@/app/lib/chat/serviceschat";

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const id = params.id;
  const dataUserLogged = await getDataSession();
  const dataFecth = { id: id, token: dataUserLogged?.token };
  const ticketItem = await getTicketById(dataFecth);
  const listMessagesTicket = await getAllMessages(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: "/dashboard/admin/tickets" },
          {
            label: `Dados do Chamado`,
            href: `/dashboard/admin/tickets/${id}`,
            active: true,
          },
        ]}
      />
      <HeadTicketView ticket={ticketItem} />
      <ContentTicketView ticket={ticketItem} messagesChat={listMessagesTicket} />
    </main>
  );
}
