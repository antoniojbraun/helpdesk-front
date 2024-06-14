"use server";

import { Room, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

const urlRooms = `${urlBaseApi}/rooms`;

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Necessário preencher o nome da sala com pelo menos 2 caracteres.",
  }),
  description: z
    .string()
    .min(10, { message: "Descrição necessária com pelo menos 10 caracteres." }),
});

const CreateRoom = FormSchema.omit({
  id: true,
});

const UpdateRoom = FormSchema.omit({
  id: true,
});

export async function getAllRooms(): Promise<Room[]> {
  const data = await fetch(urlRooms, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getRoomWithId(id: string) {
  const newUrl = `${urlRooms}/${id}`;

  const data = await fetch(newUrl, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function createRoom(prevState: State, formData: FormData) {
  const validatedFields = CreateRoom.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para criar uma sala.",
    };
  }
  const { name, description } = validatedFields.data;

  fetch(urlRooms, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((error) => console.log(`Erro ao criar sala: ${error}`));
  revalidatePath("/dashboard/rooms");
  getAllRooms();
  redirect("/dashboard/rooms");
}

export async function updateRoom(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateRoom.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para editar uma sala.",
    };
  }
  const { name, description } = validatedFields.data;
  const newUrl = `${urlRooms}/${id}`;
  fetch(newUrl, {
    method: "PATCH",
    body: JSON.stringify({ name: name, description: description }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((error) => console.log(`Erro ao editar sala: ${error}`));
  revalidatePath("/dashboard/rooms");
  redirect("/dashboard/rooms");
}
