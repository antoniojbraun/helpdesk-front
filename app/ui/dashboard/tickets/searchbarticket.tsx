import Search from "../search";
import Select from "../select";

const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";
let optionsStatus = [
  {
    value: "pending",
    name: "Pendente",
  },
  {
    value: "progress",
    name: "Em progresso",
  },
  {
    value: "done",
    name: "Resolvido",
  },
];

export default function SearchBarTicket() {
  return (
    <div className="flex flex-row items-center">
      <Search title="Pesquisar" placeholder="Digite sua pesquisa..." />
      <Select title="Ordenar" type="Status" options={optionsStatus} />
    </div>
  );
}
