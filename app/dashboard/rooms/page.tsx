import TopbarContentPage from "@/app/ui/dashboard/topbarContentPage";

export default function Page() {
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Salas"
        titleButton="Criar Sala"
        urlButton="/dashboard/rooms/create"
      />
    </div>
  );
}
