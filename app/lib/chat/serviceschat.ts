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
  msg: z.string().min(10, {
    message:
      "O conteúdo da mensagem é obrigatório com pelo menos 10 caracteres..",
  }),
  file: z
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

  const message = formData.get("message") as string;
  const file = formData.get("file") as File;
  console.log(file);
  // Validate the fields
  let validatedFields = CreateMessageChat.safeParse({
    msg: message,
    file: file.size > 0 ? file : undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Send Message",
    };
  }

  const newFormData = new FormData();
  formData.forEach((value, key) => {
    if (key === "file") {
      newFormData.append("image", value);
    } else {
      newFormData.append(key, value);
    }
  });

  const response = await fetch(`${urlChats}/ticket/${id}/user/${session?.id}`, {
    method: "POST",
    body: formData,
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

  revalidatePath(`/dashboard/user/tickets/${id}`);
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
