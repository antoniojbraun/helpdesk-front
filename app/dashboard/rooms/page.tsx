import SearchBar from "@/app/ui/dashboard/searchbar";
import TopbarContentPage from "@/app/ui/dashboard/topbarcontent";

export default function Page() {
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Salas"
        titleButton="Criar Sala"
        urlButton="/dashboard/rooms/create"
      />
      <SearchBar />
    </div>
  );
}
