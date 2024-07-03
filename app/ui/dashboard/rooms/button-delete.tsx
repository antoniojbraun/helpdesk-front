"use client";
import { deleteRoomApi } from "@/app/lib/rooms/servicesrooms";

import { useRouter } from "next/navigation";
import { DeleteButtonGeneric } from "../buttons";

export default function ButtonDeleteRoom({ roomId }: { roomId: string }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const userConfirmed = confirm("Tem certeza que quer deleter essa sala?");
    if (userConfirmed) {
      const response = await deleteRoomApi(roomId);
      alert(response.msg);
      router.refresh();
    }
  };
  return <DeleteButtonGeneric onClick={() => handleDelete(roomId)} />;
}
