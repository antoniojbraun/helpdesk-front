"use server";

import { Room, State } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

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

export async function getAllRooms(): Promise<Room[]> {
  const data = await fetch("http://localhost:3100/rooms", {
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

  fetch("http://localhost:3100/rooms", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // .then((response) => console.log(response))
    .catch((error) => console.log(`Erro ao criar sala: ${error}`));
  revalidatePath("/dashboard/rooms");
  redirect("/dashboard/rooms");
}
