import ItemMessageView from "./ticketmessageitemview";
import { Chat, itemTicket } from "@/app/lib/definitions";
import FormCreateMessages from "./form-messages";
import { poppins600 } from "@/app/ui/fonts";
import FormCreateMessagesInative from "./form-messages-inative";
export default function TicketMessagesView({
  isActive,
  messages,
  ticket,
}: {
  isActive: boolean;
  messages: Chat[];
  ticket: itemTicket;
}) {
  const styleDivIsActive = isActive ? "block" : "hidden";
  let ticketInitiated =
      ticket.status.toLocaleLowerCase() !== "pendente" &&
      ticket.status.toLocaleLowerCase() !== "finalizado";

  return (
    <div className={`${styleDivIsActive} flex flex-col bg-[#F1F2F3] pt-[20px]`}>
      <div className="border-[2px] mb-[20px]"></div>
      {!messages && (
        <div className="space-y-[20px] mx-[18px] px-[15px] pb-[15px] rounded-r-md rounded-bl-md">
          <p className={poppins600.className}>Mensagens</p>

          <p>Ainda não há mensagens a exibir =(</p>
        </div>
      )}
      {messages && (
        <div>
          {messages?.map((item: any, indice: any) => (
            <ItemMessageView messageItem={item} key={indice} />
          ))}
        </div>
      )}
      {/* i luv u */}
      {ticketInitiated ? (
        <FormCreateMessages id={ticket.id} />
      ) : (
        <FormCreateMessagesInative />
      )}
    </div>
  );
}