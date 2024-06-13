import { poppins600 } from "../../../fonts";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Ticket } from "@/app/lib/definitions";

const styleP = "whitespace-nowrap";
const styleAtributesP = " text-slate-500";
export default function HeadTicketView({
  ticket,
  authorName,
  supportName,
  roomName,
}: {
  ticket: Ticket;
  authorName: string;
  supportName: string;
  roomName: string;
}) {
  console.log(supportName);
  return (
    <div className="px-[18px] py-[20px] bg-[#F1F2F3] rounded-md">
      <div className="flex flex-row justify-between">
        <div className="space-y-[5px]">
          <p className={poppins600.className}>Dados do Chamado</p>
          <p>Veja um resumo do seu chamado</p>
          <p className="pt-[5px] text-slate-500">Chamado #{ticket.id}</p>
        </div>
        <div className="flex flex-col justify-start items-center">
          <QuestionMarkCircleIcon className="text-[#788796] size-[20px]" />
          <p>Ajuda</p>
        </div>
      </div>
      <div className="border-[2px] my-[12px]"></div>
      <div className="flex flex-col md:flex-row md:space-x-[35px]">
        <div className="flex space-x-[15px] ">
          <div className=" w-fit ">
            <p className={`${styleP} ${styleAtributesP}`}>Assunto:</p>
            <p className={`${styleP} ${styleAtributesP}`}>Responsável:</p>
            <p className={`${styleP} ${styleAtributesP}`}>Data Abertura:</p>
          </div>
          <div>
            <p className={styleP}>{ticket.title}</p>
            <p className={styleP}>{authorName}</p>
            <p className={styleP}>{ticket.dt_creation}</p>
          </div>
        </div>
        <div className="flex space-x-[45px] md:space-x-[15px] ">
          <div>
            <p className={`${styleP} ${styleAtributesP}`}>Status:</p>
            <p className={`${styleP} ${styleAtributesP}`}>Atendente:</p>
            <p className={`${styleP} ${styleAtributesP}`}>Sala:</p>
          </div>
          <div>
            <p className={styleP}>{ticket.status}</p>
            <p className={styleP}>
              {supportName == undefined ? "--" : supportName}
            </p>
            <p className={styleP}>{roomName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
