import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import FormCreateRoom from "@/app/ui/dashboard/rooms/form";
export default function CreateRoom() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Salas", href: "/dashboard/rooms" },
          {
            label: "Criar uma sala",
            href: "/dashboard/rooms/create",
            active: true,
          },
        ]}
      />
      <FormCreateRoom />
    </main>
  );
}
