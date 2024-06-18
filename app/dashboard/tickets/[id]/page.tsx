import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getItemByIdGeneric } from "@/app/lib/servicesgenerics";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const ticketItem = await getItemByIdGeneric(id, "tickets");
  const supportId = ticketItem.support_id;
  const roomId = ticketItem.room_id;
  const userId = ticketItem.user_id;
  const chatTicket = await getItemByIdGeneric(id, "chats");
  const user = await getItemByIdGeneric(userId, "users");
  const support = await getItemByIdGeneric(supportId, "users");
  const room = await getItemByIdGeneric(roomId, "rooms");
  const userName = user.name;
  const supportName = support.name;
  const roomName = room.name;

  const listMessagesTicket = chatTicket;

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
      <HeadTicketView
        ticket={ticketItem}
        authorName={userName}
        supportName={supportName}
        roomName={roomName}
      />
      <ContentTicketView
        ticket={ticketItem}
        messagesChat={listMessagesTicket}
      />
    </main>
  );
}
