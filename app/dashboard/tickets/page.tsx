import TopbarContentPage from "@/app/ui/dashboard/topbarContentPage";

export default function Page() {
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Chamados"
        titleButton="Criar Chamado"
        urlButton="/dashboard/tickets/create"
      />
    </div>
  );
}
