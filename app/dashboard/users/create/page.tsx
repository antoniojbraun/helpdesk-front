import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import FormCreateUser from "@/app/ui/dashboard/users/form";
export default function CreateUser() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Usuários", href: "/dashboard/users" },
          {
            label: "Criar um usuário",
            href: "/dashboard/users/create",
            active: true,
          },
        ]}
      />
      <FormCreateUser />
    </main>
  );
}
