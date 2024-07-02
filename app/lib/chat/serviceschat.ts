import { Chat, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { getDataSession } from "../utils";

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
  userId: string,
  prevState: State,
  formData: FormData
) {
  const session = await getDataSession();
  const message = formData.get("msg") as string;
  const image = formData.get("inputFile") as File;

  let validatedFields = CreateMessageChat.safeParse({
    msg: message,
    file: image.name !== "" ? image : undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Send Message",
    };
  }

  const response = await fetch(`${urlChats}/ticket/${id}/user/${userId}`, {
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