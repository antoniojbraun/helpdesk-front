"use client";

import { useParams } from "@/node_modules/next/navigation";

export default function EditTicket() {
  const { id } = useParams();

  return <main>Visualizar Chamado {id}</main>;
}
