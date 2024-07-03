"use server";

import {
  Room,
  StateRoom,
  urlBaseApi,
  DataCreateRoom,
  RoomFormError,
} from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { getDataSession } from "../utils";

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

export async function getAllRoomsAPI(data: {
  token?: string;
  userId?: string;
}): Promise<Room[]> {
  const response = await fetch(`${urlBaseApi}/rooms`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${data.token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao buscar dados: ${errorData}`);
  }
  return response.json();
}

export async function getRoomWithIdAPI(dataFetch: {
  roomId?: string;
  token?: string;
}) {
  const newUrl = `${urlRooms}/${dataFetch.roomId}`;
  const data = await fetch(newUrl, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${dataFetch.token}` },
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function createRoom(prevState: StateRoom, formData: FormData) {
  const session = await getDataSession();

  const validatedFields = FormSchema.safeParse({
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

  const response = await fetch(urlRooms, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      status: false,
      message: errorData,
    };
  }
  revalidatePath("/dashboard/support/rooms");
  redirect("/dashboard/support/rooms");
}

export async function createRoomNew(formData: FormData) {
  const session = await getDataSession();

  const validatedFields = CreateRoom.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, description } = validatedFields.data;

  const response = await fetch(urlRooms, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
  revalidatePath("/dashboard/support/rooms");
  return {
    status: true,
    msg: "Sala cadastrada com sucesso",
  };
}

export async function updateRoomNew(formData: FormData) {
  const session = await getDataSession();

  const validatedFields = FormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, description, id } = validatedFields.data;

  const response = await fetch(`${urlBaseApi}/rooms/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      description: description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    console.log(response.ok);
    const errorData = await response.json();
    return {
      status: false,
      msg: errorData.error,
    };
  }
  revalidatePath("/dashboard/support/rooms");
  return {
    status: true,
    msg: "Sala atualizada com sucesso",
  };
}

export async function updateRoom(
  id: string,
  prevState: StateRoom,
  formData: FormData
) {
  const session = await getDataSession();

  const validatedFields = FormSchema.safeParse({
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

  const response = await fetch(newUrl, {
    method: "PATCH",
    body: JSON.stringify({ name: name, description: description }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    console.log("Error ao atualizar sala: " + response.statusText);
  }

  if (response.ok) {
    return {
      status: true,
    };
  }
}

export async function deleteRoomApi(roomId: string) {
  const session = await getDataSession();
  const response = await fetch(`${urlBaseApi}/rooms/${roomId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session?.token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    return {
      status: false,
      msg: errorData.error,
    };
  }
  return {
    status: true,
    msg: "Sala deletada com sucesso!",
  };
}
