import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getItemByIdGeneric } from "@/app/lib/servicesgenerics";
import { getAllMessages } from "@/app/lib/chat/serviceschat";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const ticketItem = await getItemByIdGeneric(id, "itemTicket");
  const listMessagesTicket = await getAllMessages(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: "/dashboard/tickets" },
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
