import { poppins600 } from "../../../fonts";
import { Chat } from "@/app/lib/definitions";
import Image from "next/image";
const styleUserMessageBox =
  "ml-[40px] mr-[18px] rounded-r-md rounded-bl-md shadow-[#C2CFD9] bg-[#C2CFD9]";
const styleUserMessageEffect =
  "border-b-[#C2CFD9] border-t-transparent border-r-transparent border-l-transparent left-[32px] rotate-45";

const styleSupportMessageBox =
  "ml-[18px] mr-[40px] rounded-l-md rounded-br-md shadow-[#1AAE9F] bg-[#1AAE9F]";
const styleSupportMessageEffect =
  "border-b-[#1AAE9F] border-t-transparent border-r-transparent border-l-transparent right-[32px] -rotate-45";

const styleDateUser = "mr-[20px] justify-end";
const styleDateSupport = "ml-[20px]";

export default function ItemMessageView({
  messageItem,
}: {
  messageItem: Chat;
}) {
  const colorEfect =
    messageItem.user.userType === "Usuário"
      ? styleUserMessageEffect
      : styleSupportMessageEffect;
  const colorBox =
    messageItem.user.userType === "Usuário"
      ? styleUserMessageBox
      : styleSupportMessageBox;

  const styleDateMsg =
    messageItem.user.userType === "Usuário" ? styleDateUser : styleDateSupport;
  
  return (
    <div className="relative mb-[12px] pt-[8px]">
      <div
        className={`${colorEfect} absolute border-solid border-[8px] top-[0px] `}></div>
      <div
        className={`${colorBox} space-y-[10px] mb-[7px] text-[#12181e] px-[25px] py-[20px] shadow-md`}>
        <p className={`${poppins600.className}`}>{messageItem.user.name}</p>
        <p>{messageItem.message}</p>
        {messageItem.imageBase64 && (
          <Image
            alt="Mensagens chat"
            width="500"
            height="600"
            src={`data:image/png;base64,${messageItem.imageBase64}`}
          />
        )}
      </div>
      <div className={`flex text-sm text-[#5e5e5e] ${styleDateMsg}`}>
        <p>
          {new Date(messageItem.sendedAt).getDate()}/
          {new Date(messageItem.sendedAt).getMonth() + 1}/
          {new Date(messageItem.sendedAt).getFullYear()} às{" "}
          {new Date(messageItem.sendedAt).getHours()}:
          {new Date(messageItem.sendedAt)
            .getMinutes()
            .toString()
            .padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
