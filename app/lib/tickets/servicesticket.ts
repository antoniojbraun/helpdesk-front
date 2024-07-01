"use server";

import { TicketByUser, itemTicket, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { getDataSession } from "@/app/lib/utils";

const urlTickets = `${urlBaseApi}/tickets/`;

const FormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(5, { message: "Títuo é obrigatório com pelo menos 5 caracteres." }),
  description: z.string().min(10, {
    message: "Descrição é necessária com pelo menos 10 caracteres.",
  }),
  roomid: z.string({ message: "Sala é necessária." }),
});

const CreateTicket = FormSchema.omit({
  id: true,
});

export async function getAllTickets(): Promise<TicketByUser[]> {
  const newUrl = `http://localhost:3100/tickets`;
  const data = await fetch(newUrl, {
    cache: "no-store",
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
  const session = await getDataSession();
  const newUrl = `${urlBaseApi}/tickets`;
  console.log(formData);
  const validatedFields = CreateTicket.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    roomid: formData.get("roomid"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Create Ticket",
    };
  }
  const { title, description, room } = validatedFields.data;
  console.log(title, description, room, session?.id);
  const response = await fetch(newUrl, {
    method: "POST",
    body: {
      title: title,
      description: description,
      roomId: room,
      userId: session?.id,
      images: [],
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${session?.token}`,
    },
  });
  if (!response.ok) {
    const dataError = await response.json();
    console.error("Erro ao cadastrar um chamado:");
    console.error(dataError);
  }

  revalidatePath("/dashboard/user/tickets");
  redirect("/dashboard/user/tickets");
}

// d042c31a-5454-4bef-890c-aa06db7333cc
