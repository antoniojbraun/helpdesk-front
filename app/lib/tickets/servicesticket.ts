"use server";

import { TicketByUser, itemTicket, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { getDataSession } from "@/app/lib/utils";

const urlTickets = `${urlBaseApi}/tickets/`;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  userid: z.string(),
  title: z
    .string()
    .min(5, { message: "Título é obrigatório com pelo menos 5 caracteres." }),
  description: z.string().min(10, {
    message: "Descrição é necessária com pelo menos 10 caracteres.",
  }),
  roomid: z.string().min(2, { message: "Sala é necessária." }),
  images: z
    .instanceof(File)
    .optional()
    .refine((file: File | undefined) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Tamanho máximo permitido da imagem: 5MB.`,
    })
    .refine(
      (file: File | undefined) =>
        !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          "Formatos de arquivos permitidos: .jpg, .jpeg, .png and .webp.",
      }
    ),
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
  token?: string;
  userId?: string;
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
  token?: string;
  userId?: string;
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
  token?: string;
  userId?: string;
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
  idUser?: string;
  token?: string;
}): Promise<TicketByUser[]> {
  const newUrl = `${urlBaseApi}/tickets/user/${dataFetch.idUser}`;
  const data = await fetch(newUrl, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${dataFetch.token}` },
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getTicketById(dataFetch: {
  id?: string;
  token?: string;
}) {
  const newUrl = `${urlBaseApi}/tickets/${dataFetch.id}`;

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
  const file = formData.get("images") as File;

  const dataForm = {
    userid: formData.get("userid"),
    title: formData.get("title"),
    description: formData.get("description"),
    roomid: formData.get("roomid"),
    images: file.size > 0 ? file : undefined,
  };

  const validatedFields = FormSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Create Ticket",
    };
  }

  formData.forEach((value, key) => {
    if (dataForm.images == undefined) {
      formData.delete("images");
    }
  });

  const response = await fetch(newUrl, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    const dataError = await response.json();
    console.error("Erro ao cadastrar um chamado:");
    console.error(dataError);
    return;
  }

  revalidatePath("/dashboard/user/tickets");
  redirect("/dashboard/user/tickets");
}

export async function createTicketNew(formData: FormData) {
  const session = await getDataSession();
  const newUrl = `${urlBaseApi}/tickets`;
  const file = formData.get("images") as File;

  const dataForm = {
    userid: formData.get("userid"),
    title: formData.get("title"),
    description: formData.get("description"),
    roomid: formData.get("roomid"),
    images: file.size > 0 ? file : undefined,
  };

  const validatedFields = FormSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (dataForm.images == undefined) formData.delete("images");

  const response = await fetch(newUrl, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      status: false,
      msg: errorData.error,
    };
  }
  revalidatePath("/dashboard/user/tickets");
  return {
    status: true,
    msg: "Chamado criado com sucesso!",
  };
}

export async function deleteTicketApi(ticketId: string) {
  const getDataUserLogged = await getDataSession();
  const token = getDataUserLogged?.token;
  const userId = getDataUserLogged?.id;
  let newUrlDelete = `${urlBaseApi}/tickets/${ticketId}/user/${userId}`;

  const response = await fetch(newUrlDelete, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const statusError = response.status;
    return {
      status: statusError,
    };
  }

  return response.ok;
}

export const handleChangeSupportStatusTicket = async (data: {
  ticketId?: string;
  userId?: string;
  typeChange: string;
}) => {
  const getDataUserLogged = await getDataSession();
  const token = getDataUserLogged?.token;
  const response = await fetch(
    `${urlBaseApi}/tickets/${data.ticketId}/user/${data.userId}:${data.typeChange}`,
    {
      method: "PUT",
      body: JSON.stringify({ id: data.ticketId, supportUserId: data.userId }),
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const dataError = await response.json();
    return response.statusText;
  }
  if (response.ok) {
    return response.ok;
  }
};

export const handleChangeUserStatusTicket = async (data: {
  ticketId?: string;
}) => {
  const getDataUserLogged = await getDataSession();
  const token = getDataUserLogged?.token;
  const userId = getDataUserLogged?.id;
  const response = await fetch(
    `${urlBaseApi}/tickets/${data.ticketId}/user/${userId}:close`,
    {
      method: "PUT",
      body: JSON.stringify({ id: data.ticketId, userId: userId }),
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    const dataError = await response.json();
    return response.statusText;
  }
  if (response.ok) {
    return response.ok;
  }
};
