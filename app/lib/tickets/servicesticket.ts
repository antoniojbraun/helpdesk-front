"use server";

import { TicketByUser, itemTicket, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { getDataSession } from "@/app/lib/utils";

const urlTickets = `${urlBaseApi}/tickets/`;

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNTc4MjM2Yy05ZTdiLTQ1OTAtYWVjNi1iN2FhYjBhZmFmNTgiLCJlbWFpbCI6InplY2F1cnVidUBnbWFpbC5jb20uYnIiLCJqdGkiOiIwNTg5MTQyOC1kNDIxLTQwMzMtODI0Yi01MWZkMGEzYmYyZDYiLCJuYmYiOjE3MTk3OTMzOTIsImlhdCI6IjA3LzAxLzIwMjQgMDA6MjM6MTIiLCJleHAiOjE3MTk3OTY5OTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJBdWRpZW5jZSJ9.oejLJfWGGYW_Ug1IeQyeyVpJAP7xjZhcqlN24iHRaJdB9TInPIfOylGQO7EZbw1PHcb8Qi-yWumraRpF0wSVNg"

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

export async function getAllTickets(): Promise<TicketByUser[]> {
  const data = await fetch(`${urlBaseApi}/tickets/user/e11e52d8-6909-449d-968b-a7700e45e8e9`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getAllTicketsAPI(data: {
  token: string;
  userId: string;
}): Promise<TicketByUser[]> {
  const response = await fetch(`${urlBaseApi}/tickets/user/${data.userId}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao buscar dados: ${errorData}`);
  }

  return response.json();
}

export async function getAllTicketsSupportAPI(data: {
  token: string;
  userId: string;
}): Promise<TicketByUser[]> {
  const response = await fetch(`${urlBaseApi}/tickets/support/${data.userId}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao buscar dados: ${errorData}`);
  }

  return response.json();
}

export async function getPendingTicketsAPI(data: {
  token: string;
  userId: string;
}): Promise<TicketByUser[]> {
  const response = await fetch(`${urlBaseApi}/tickets/user/${data.userId}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao buscar dados: ${errorData}`);
  }
  let pendingTickets = await response.json();
  pendingTickets = pendingTickets.filter(
    (item: any) => item.status === "Pendente"
  );
  return pendingTickets;
}

export async function getAllTicketsByUser(dataFetch: {
  idUser: string;
  token: string;
}): Promise<TicketByUser[]> {
  const newUrl = `${urlBaseApi}/tickets/user/${dataFetch.idUser}`;
  const data = await fetch(newUrl, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${dataFetch.token}` },
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getTicketById(dataFetch: { id: string; token: string }) {
  const newUrl = `${urlBaseApi}/tickets/${dataFetch.id}`;
  console.log(newUrl);
  const data = await fetch(newUrl, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${dataFetch.token}` },
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
