import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getTicketById } from "@/app/lib/tickets/servicesticket";
import { getDataSession } from "@/app/lib/utils";
import { getAllMessages } from "@/app/lib/chat/serviceschat";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const getDataUserLogged = await getDataSession();

  const listMessagesTicket = await getAllMessages(id);

  const dataFetch = {
    id: id,
    token: getDataUserLogged?.token,
  };
  const ticketItem = await getTicketById(dataFetch);
  let urlHrefBack = "/dashboard/user/tickets/";
  if (ticketItem.status === "Pendente") urlHrefBack += "pending";
  console.log(ticketItem);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Chamados", href: `${urlHrefBack}` },
          {
            label: `Dados do Chamado`,
            href: `/dashboard/user/tickets/${id}`,
            active: true,
          },
        ]}
      />
      <HeadTicketView ticket={ticketItem} type="user" />
      <ContentTicketView
        ticket={ticketItem}
        messagesChat={listMessagesTicket}
      />
    </main>
  );
}
