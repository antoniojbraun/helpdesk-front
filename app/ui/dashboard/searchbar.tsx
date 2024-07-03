import Search from "./search";

const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";

export default function SearchBar() {
  return (
    <div className="flex flex-row items-center">
      <Search title="Pesquisar" placeholder="Digite sua pesquisa..." />
    </div>
  );
}
