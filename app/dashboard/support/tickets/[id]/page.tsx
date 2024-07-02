import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";

import { getTicketById } from "@/app/lib/tickets/servicesticket";
import { getDataSession } from "@/app/lib/utils";
import { getAllMessages } from "@/app/lib/chat/serviceschat";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await getDataSession();
  const dataFetch = {
    id: id,
    token: session?.token,
  };

  const chats = await getAllMessages(id);
  const ticketItem = await getTicketById(dataFetch);

  let urlHrefBack = "/dashboard/support/tickets/";
  if (ticketItem.status === "Pendente") urlHrefBack += "pending";

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: `${urlHrefBack}` },
          {
            label: `Dados do Chamado`,
            href: `/dashboard/support/tickets/${id}`,
            active: true,
          },
        ]}
      />
      <HeadTicketView ticket={ticketItem} userId={session?.id} type="support" />
      <ContentTicketView ticket={ticketItem} messagesChat={chats} />
    </main>
  );
}
