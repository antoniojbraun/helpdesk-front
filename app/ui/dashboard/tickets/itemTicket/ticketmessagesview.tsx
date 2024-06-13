import ItemMessageView from "./ticketmessageitemview";
import { Message } from "@/app/lib/definitions";
export default function TicketMessagesView({
  isActive,
  messagesChat,
}: {
  isActive: boolean;
  messagesChat: Message[];
}) {
  const styleDivIsActive = isActive ? "block" : "hidden";
  const messages = messagesChat;
  return (
    <div className={`${styleDivIsActive} flex flex-col bg-[#F1F2F3] pt-[20px]`}>
      <div className="border-[2px] mb-[20px]"></div>

      {messagesChat.map((item, indice) => (
        <ItemMessageView messageItem={item} key={indice} />
      ))}
    </div>
  );
}
