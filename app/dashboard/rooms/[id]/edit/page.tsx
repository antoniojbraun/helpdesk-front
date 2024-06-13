import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import FormEditRoom from "@/app/ui/dashboard/rooms/edit-form";
import { getRoomWithId } from "@/app/lib/rooms/servicesrooms";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const room = await getRoomWithId(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Salas", href: "/dashboard/rooms" },
          {
            label: "Editar uma sala ",
            href: `/dashboard/rooms/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormEditRoom room={room} />
    </main>
  );
}
