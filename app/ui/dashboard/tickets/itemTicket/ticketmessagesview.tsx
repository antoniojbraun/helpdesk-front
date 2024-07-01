import ItemMessageView from "./ticketmessageitemview";
import { Chat } from "@/app/lib/definitions";
import FormCreateMessages from "./form-messages";
export default function TicketMessagesView({
  isActive,
  messagesChat,
}: {
  isActive: boolean;
  messagesChat: Chat[];
}) {
  const styleDivIsActive = isActive ? "block" : "hidden";

  return (
    <div className={`${styleDivIsActive} flex flex-col bg-[#F1F2F3] pt-[20px]`}>
      <div className="border-[2px] mb-[20px]"></div>

      <div>
        {/* {messagesChat.map((item, indice) => (
          <ItemMessageView messageItem={item} key={indice} />
        ))} */}
      </div>
      {/* <FormCreateMessages id={messagesChat.id} /> */}
    </div>
  );
}
