"use server";

import { Ticket, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(5, { message: "Títuo é obrigatório com pelo menos 5 caracteres." }),
  description: z.string().min(10, {
    message: "Descrição é necessária com pelo menos 10 caracteres.",
  }),
  room: z.string().min(2, { message: "Sala é necessária." }),
  dt_creation: z.string(),
  status: z.enum(["Pendente", "Em Progresso", "Resolvido"]),
  user_id: z.string(),
});

const CreateTicket = FormSchema.omit({
  id: true,
  dt_creation: true,
  user_id: true,
});

export async function getAllTickets(): Promise<Ticket[]> {
  const newUrl = `${urlBaseApi}/tickets`;
  const data = await fetch(newUrl, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getTicketById(id: string) {
  const newUrl = `${urlBaseApi}/tickets/${id}`;
  const data = await fetch(newUrl, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function createTicket(prevState: State, formData: FormData) {
  console.log(typeof formData.get("room"));
  const validatedFields = CreateTicket.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    room: formData.get("room"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Create Ticket",
    };
  }
  const { title, description, room, status } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];
  const newUrl = `${urlBaseApi}/tickets`;

  fetch(newUrl, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      room: room,
      status: status,
      dt_creation: date,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((error) => console.log(error));

  revalidatePath("/dashboard/tickets");
  redirect("/dashboard/tickets");
}
