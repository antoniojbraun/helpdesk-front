import TopbarContentPage from "@/app/ui/dashboard/topbarContentPage";

export default function Page() {
  return (
    <div className="flex flex-col">
      <TopbarContentPage
        titlePage="Usuários"
        titleButton="Criar Usuário"
        urlButton="/dashboard/users/create"
      />
    </div>
  );
}
