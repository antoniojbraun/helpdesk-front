"use client";

import { useEffect, useState } from "react";
import { urlBaseApi } from "@/app/lib/definitions";
import { handleChangeSupportStatusTicket } from "@/app/lib/tickets/servicesticket";
import { useRouter } from "next/navigation";

export default function SupportTakeTicket({
  ticketAttendant,
  ticketStatus,
  ticketId,
  userId,
}: {
  ticketAttendant: string;
  ticketStatus: string;
  ticketId: string;
  userId?: string;
}) {
  const router = useRouter();
  const [textAction, setTextAction] = useState("");
  useEffect(() => {
    console.log(ticketStatus);
    if (ticketStatus.toLowerCase() === "pendente")
      setTextAction("Assumir chamado");
    if (ticketStatus.toLowerCase() === "em progresso")
      setTextAction("Finalizar chamado");
  }, []);

  async function handleChangeStatus() {
    switch (ticketStatus) {
      case "Pendente":
        const dataStartTicket = {
          ticketId: ticketId,
          userId: userId,
          typeChange: "start",
        };
        const hasStarted = await handleChangeSupportStatusTicket(
          dataStartTicket
        );
        if (hasStarted) setTextAction("Finalizar chamado");
        alert(
          "O chamado iniciado com sucesso! Agora você pode interagir com o usuário."
        );
        router.refresh();
        break;
      case "Em Progresso":
        const dataFinishTicket = {
          ticketId: ticketId,
          userId: userId,
          typeChange: "finish",
        };
        const hasFinished = await handleChangeSupportStatusTicket(
          dataFinishTicket
        );
        alert("O chamado foi finalizado. Aguarde retorno do usuário!");
        setTextAction("");
        router.refresh();
    }
  }
  const colorButtonStart =
    " text-green-50 bg-green-600 hover:bg-green-500 active:bg-green-400";
  const colorButtonFinish =
    "   text-blue-50 bg-blue-600 hover:bg-blue-500 active:bg-blue-400";
  const colorButton =
    ticketStatus == "Pendente"
      ? colorButtonStart
      : ticketStatus == "Em Progresso"
      ? colorButtonFinish
      : "";
  return (
    <div
      className={`py-2 px-3 cursor-pointer items-center rounded-lg ${colorButton}`}>
      <p onClick={handleChangeStatus} className="text-[13px]">
        {textAction}
      </p>
    </div>
  );
}
