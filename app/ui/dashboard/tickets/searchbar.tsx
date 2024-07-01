import Search from "../search";
import Select from "../select";

const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";
let optionsStatus = [
  {
    value: "id",
    name: "ID",
  },
  {
    value: "title",
    name: "Título",
  },
  {
    value: "room",
    name: "Sala",
  },
  {
    value: "status",
    name: "Status",
  },
];

export default function SearchBarTicket({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0">
      <Search
        isActive={isActive}
        title="Pesquisar"
        placeholder="Digite sua pesquisa..."
      />
      <Select
        isActive={isActive}
        title="Ordenar"
        type="Selecione..."
        options={optionsStatus}
      />
    </div>
  );
}
