import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getItemByIdGeneric } from "@/app/lib/servicesgenerics";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const ticketItem = await getItemByIdGeneric(id, "itemTicket");
  const chatTicket = await getItemByIdGeneric(id, "chats");
  const listMessagesTicket = chatTicket;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: "/dashboard/support/tickets" },
          {
            label: `Dados do Chamado`,
            href: `/dashboard/tickets/${id}`,
            active: true,
          },
        ]}
      />
      <HeadTicketView ticket={ticketItem} />
      <ContentTicketView
        ticket={ticketItem}
        messagesChat={listMessagesTicket}
      />
    </main>
  );
}
