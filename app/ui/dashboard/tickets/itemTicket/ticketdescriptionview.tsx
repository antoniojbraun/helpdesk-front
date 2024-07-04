import { itemTicket } from "@/app/lib/definitions";
import { poppins600 } from "../../../fonts";
import Image from "next/image";
export default function TicketDescriptionView({
  isActive,
  ticket,
}: {
  isActive: boolean;
  ticket: itemTicket;
}) {
  const styleDivIsActive = isActive ? "block" : "hidden";
  let testandoPorra: string[] = [];
  testandoPorra.push(ticket.imagesBase64);
  console.log(testandoPorra[0].length);
  return (
    <div className={`${styleDivIsActive} flex flex-col bg-[#F1F2F3] relative`}>
      <div className="border-[2px] my-[25px]"></div>
      <div className="space-y-[20px] mx-[18px] px-[15px] pb-[15px] rounded-r-md rounded-bl-md">
        <p className={poppins600.className}>Descrição do chamado</p>
        <p>{ticket.description}</p>

        {testandoPorra[0].length > 0 &&
          testandoPorra.map((imgSrc, index) => (
            <img
              alt="Descrição chamado"
              key={index}
              src={`data:image/png;base64,${imgSrc}`}
            />
          ))}
      </div>
    </div>
  );
}
