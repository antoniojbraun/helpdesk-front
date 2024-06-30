import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import FormEditUser from "@/app/ui/dashboard/users/edit-form";
import { getUserWithId } from "@/app/lib/users/servicesusers";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getUserWithId(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Usuários", href: "/dashboard/admin/users" },
          {
            label: "Editar um Usuário ",
            href: `/dashboard/admin/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditUser user={user} />
    </main>
  );
}
