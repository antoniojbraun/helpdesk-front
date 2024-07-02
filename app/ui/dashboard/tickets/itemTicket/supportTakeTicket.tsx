"use client";

import { useEffect, useState } from "react";
import { urlBaseApi } from "@/app/lib/definitions";
import { handleChangeSupportStatusTicket } from "@/app/lib/tickets/servicesticket";
import { useRouter } from "next/navigation";

export default function SupportTakeTicket({
  ticketStatus,
  ticketId,
  userId,
}: {
  ticketStatus: string;
  ticketId: string;
  userId?: string;
}) {
  console.log("bunda");
  const router = useRouter();
  const [textAction, setTextAction] = useState("");
  useEffect(() => {
    if (ticketStatus.toLowerCase() === "pendente")
      setTextAction("Assumir chamado");
    if (ticketStatus.toLowerCase() === "em progresso")
      setTextAction("Finalizar chamado");
  });

  async function handleChangeStatus() {
    if (ticketStatus !== "Pendente" && ticketStatus !== "Em Progresso") return;
    switch (ticketStatus) {
      case "Pendente":
        const isConfirmed = confirm(
          "Tem certeza que deseja assumir esse atendimento?"
        );
        if (isConfirmed) {
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
        }
        break;
      case "Em Progresso":
        const isConfirm = confirm(
          "Tem certeza que deseja finalizar esse atendimento?"
        );
        if (isConfirm) {
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
  }
  const colorButtonDefault = "   text-gray-50 bg-gray-300";
  const colorButtonStart =
    " text-green-50 bg-green-600 hover:bg-green-500 active:bg-green-400";
  const colorButtonFinish =
    "   text-blue-50 bg-blue-600 hover:bg-blue-500 active:bg-blue-400";
  const colorButton =
    ticketStatus == "Pendente"
      ? colorButtonStart
      : ticketStatus == "Em Progresso"
      ? colorButtonFinish
      : colorButtonDefault;
  return (
    <div className={`  items-center rounded-lg ${colorButton} cursor-pointer`}>
      <p
        hidden={textAction == ""}
        onClick={handleChangeStatus}
        className="py-2 px-3 text-[13px] cursor-pointer">
        {textAction}
      </p>
    </div>
  );
}
