import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import FormEditRoom from "@/app/ui/dashboard/rooms/edit-form";
import { getRoomWithIdAPI } from "@/app/lib/rooms/servicesrooms";
import { getDataSession } from "@/app/lib/utils";
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const getDataUserLogged = await getDataSession();
  const dataFetch = {
    token: getDataUserLogged?.token,
    roomId: id,
  };

  const room = await getRoomWithIdAPI(dataFetch);
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
