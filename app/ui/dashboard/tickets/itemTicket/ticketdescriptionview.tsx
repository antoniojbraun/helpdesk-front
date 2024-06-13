import { poppins600 } from "../../../fonts";
export default function TicketDescriptionView({
  isActive,
  description,
  img,
}: {
  isActive: boolean;
  description: string;
  img: string;
}) {
  const styleDivIsActive = isActive ? "block" : "hidden";

  return (
    <div className={`${styleDivIsActive} flex flex-col bg-[#F1F2F3] relative`}>
      <div className="border-[2px] my-[25px]"></div>
      <div className="space-y-[20px] mx-[18px] px-[15px] pb-[15px] rounded-r-md rounded-bl-md">
        <p className={poppins600.className}>Descrição do chamado</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
