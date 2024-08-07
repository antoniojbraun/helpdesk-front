"use server";

import { Chat, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { getDataSession } from "@/app/lib/utils";

const urlChats = `${urlBaseApi}/chats`;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  id: z.string(),
  message: z.string().min(10, {
    message:
      "O conteúdo da mensagem é obrigatório com pelo menos 10 caracteres..",
  }),
  image: z
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

const CreateMessageChat = FormSchema.omit({
  id: true,
});

export async function createMessageChat(
  id: string,
  prevState: State,
  formData: FormData
) {
  const session = await getDataSession();

  const file = formData.get("images") as File;
  const validatedFields = CreateMessageChat.safeParse({
    msg: formData.get("message"),
    image: file.size > 0 ? file : undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Send Message",
    };
  }
  if (file.size === 0) formData.delete("images");

  const newFormData = new FormData();
  formData.forEach((value, key) => {
    if (key == "images") {
      newFormData.append("image", value);
    } else {
      newFormData.append(key, value);
    }
  });

  const response = await fetch(`${urlChats}/ticket/${id}/user/${session?.id}`, {
    method: "POST",
    body: newFormData,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    const dataError = await response.json();
    console.error("Erro ao cadastrar uma mensagem:");
    console.error(dataError);
    return;
  }
  revalidatePath(`/dashboard/support/tickets/${id}`);
  revalidatePath(`/dashboard/user/tickets/${id}`);
}

export async function createMessageChatNew(id: string, formData: FormData) {
  const session = await getDataSession();
  const file = formData.get("image") as File;

  const dataForm = {
    message: formData.get("message"),
    image: file.size > 0 ? file : undefined,
  };
  const validatedFields = CreateMessageChat.safeParse(dataForm);
  console.log(validatedFields.error?.flatten().fieldErrors);

  if (!validatedFields.success) {
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (dataForm.image == undefined) formData.delete("images");

  const newFormData = new FormData();
  formData.forEach((value, key) => {
    if (key == "images") {
      newFormData.append("image", value);
    } else {
      newFormData.append(key, value);
    }
  });

  const response = await fetch(`${urlChats}/ticket/${id}/user/${session?.id}`, {
    method: "POST",
    body: newFormData,
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
  revalidatePath(`/dashboard/support/tickets/${id}`);
  revalidatePath(`/dashboard/user/tickets/${id}`);
  return {
    status: true,
    msg: "Mensagem cadastrada com sucesso",
  };
}

export async function getAllMessages(id: string): Promise<Chat[]> {
  const session = await getDataSession();

  const data = await fetch(`${urlChats}/ticket/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });

  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}
