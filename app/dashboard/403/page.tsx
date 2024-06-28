import { poppins600 } from "@/app/ui/fonts";
export default function ForbiddenPage() {
  return (
    <div className="space-y-3">
      <h1 className={`${poppins600.className} text-[20px]`}>
        403 - Forbidden Page
      </h1>
      <p>Você não tem permissão para acessar essa página</p>
      <p className={`${poppins600.className} text-[20px]`}>=(</p>
    </div>
  );
}
