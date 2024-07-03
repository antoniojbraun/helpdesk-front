"use client";

import { handleChangeUserStatusTicket } from "@/app/lib/tickets/servicesticket";
import { useRouter } from "next/navigation";

export default function UserFinishesTicket({
  ticketStatus,
  ticketId,
  userId,
}: {
  ticketStatus: string;
  ticketId: string;
  userId?: string;
}) {
  const router = useRouter();
  
  async function handleChangeStatus() {
    if (ticketStatus !== "Resolvido") return;
    const isCertain = confirm(
      "Tem certeza que deseja encerrar este atendimento?"
    );
    if (isCertain) {
      switch (ticketStatus) {
        case "Resolvido":
          const dataStartTicket = {
            ticketId: ticketId,
          };
          const hasFinished = await handleChangeUserStatusTicket(
            dataStartTicket
          );

          alert(
            "Este chamado foi encerrado. Você não poderá mais interagir com ele."
          );
          router.refresh();
          break;
        default:
      }
    }
  }
  const colorButtonFinish =
    " text-red-50 bg-red-500 hover:bg-red-400 active:bg-red-300 ";
  const colorBurronFinished = "   text-gray-50 bg-gray-300";
  const colorButton =
    ticketStatus == "Resolvido" ? colorButtonFinish : colorBurronFinished;

  return (
    <div className={`  items-center rounded-lg cursor-pointer ${colorButton}`}>
      <p onClick={handleChangeStatus} className="py-2 px-3 text-[13px] ">
        Encerrar Chamado
      </p>
    </div>
  );
}
