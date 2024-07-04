import { poppins600 } from "../../../fonts";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { itemTicket } from "@/app/lib/definitions";
import SupportTakeTicket from "./supportTakeTicket";
import UserFinishesTicket from "./userCloseTicket";

const styleP = "whitespace-normal";
const styleAtributesP = " text-slate-500";
export default function HeadTicketView({
  ticket,
  userId,
  type,
}: {
  ticket: itemTicket;
  userId?: string;
  type?: string;
}) {
  const isSupport = type == "support";
  const isUser = type == "user";
  return (
    <div className="px-[18px] py-[20px] bg-[#F1F2F3] rounded-md">
      <div className="flex flex-row justify-between">
        <div className="space-y-[5px]">
          <p className={poppins600.className}>Dados do Chamado</p>
          <p>Veja um resumo do seu chamado</p>
          <div className="space-x-5 flex flex-row items-center">
            <p className="pt-[5px] text-slate-500">Chamado #{ticket.number}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {/* <div className="flex flex-col items-center justify-center">
            <QuestionMarkCircleIcon className="text-[#788796] size-[20px]" />
            <p>Ajuda</p>
          </div> */}
          <div className="mt-2">
            {isUser && (
              <UserFinishesTicket
                ticketStatus={ticket.status}
                ticketId={ticket.id}
              />
            )}
            {isSupport && (
              <SupportTakeTicket
                ticketStatus={ticket.status}
                ticketId={ticket.id}
                userId={userId}
              />
            )}
          </div>
        </div>
      </div>
      <div className="border-[2px] my-[12px]"></div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8 max-[670px]:col-span-7 min-[1000px]:col-span-8 min-[1130px]:col-span-9 ">
          <div className="grid grid-cols-12 gap-1">
            <div
              className={`col-span-12 md:col-span-4 min-[1000px]:col-span-3 min-[1200px]:col-span-2 ${styleAtributesP}`}>
              Assunto:
            </div>
            <div className="col-span-12 md:col-span-8 min-[1000px]:col-span-9 min-[1200px]:col-span-10">
              {ticket.title}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div
              className={`col-span-12 md:col-span-4 min-[1000px]:col-span-3 min-[1200px]:col-span-2  ${styleAtributesP}`}>
              Responsável:
            </div>
            <div className="col-span-12 md:col-span-8 min-[1000px]:col-span-9 min-[1200px]:col-span-10 ">
              {ticket.responsible}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div
              className={`col-span-12 md:col-span-4 min-[1000px]:col-span-3 min-[1200px]:col-span-2  ${styleAtributesP}`}>
              Data Abertura:
            </div>
            <div className="col-span-12 md:col-span-8 min-[1000px]:col-span-9 min-[1200px]:col-span-10 ">
              {ticket.createdAt}
            </div>
          </div>
        </div>
        <div className="col-span-4 max-[670px]:col-span-5 min-[1000px]:col-span-4 min-[1130px]:col-span-2 ">
          <div className="grid grid-cols-12 gap-2">
            <div
              className={`col-span-12 min-[630px]:col-span-6 min-[940px]:col-span-5 min-[1130px]:col-span-8  ${styleAtributesP}`}>
              Status:
            </div>
            <div className="min-[940px]:col-span-7 min-[630px]:col-span-6 col-span-12 min-[1130px]:col-span-2">
              {ticket.status}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div
              className={`min-[940px]:col-span-5 min-[630px]:col-span-6 col-span-12 min-[1130px]:col-span-8 ${styleAtributesP}`}>
              Atendente:
            </div>
            <div className="min-[940px]:col-span-7 min-[630px]:col-span-6 col-span-12 min-[1130px]:col-span-4">
              {ticket.attendant ? `${ticket.attendant.split(" ")[0]}` : "--"}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div
              className={`min-[940px]:col-span-5 min-[630px]:col-span-6 col-span-12 min-[1130px]:col-span-8 ${styleAtributesP}`}>
              Sala:
            </div>
            <div className="min-[940px]:col-span-7 min-[630px]:col-span-6 col-span-12 min-[1130px]:col-span-4">
              {ticket.room.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
