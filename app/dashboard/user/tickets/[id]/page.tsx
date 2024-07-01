import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import ContentTicketView from "@/app/ui/dashboard/tickets/itemTicket/contentticketview";
import HeadTicketView from "@/app/ui/dashboard/tickets/itemTicket/headticketview";
import { getTicketById } from "@/app/lib/tickets/servicesticket";
import { getDataSession } from "@/app/lib/utils";
import { chats } from "@/app/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const getDataUserLogged = await getDataSession();

  const dataFetch = {
    id: id,
    token: getDataUserLogged?.token,
  };
  const ticketItem = await getTicketById(dataFetch);
  let urlHrefBack = "/dashboard/user/tickets/";
  if (ticketItem.status === "Pendente") urlHrefBack += "pending";
  const listMessagesTicket = chats;

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
      <HeadTicketView ticket={ticketItem} />
      <ContentTicketView
        ticket={ticketItem}
        messagesChat={listMessagesTicket}
      />
    </main>
  );
}
