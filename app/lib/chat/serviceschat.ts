import { Chat, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

const urlChats = `${urlBaseApi}/chats`;
const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNTc4MjM2Yy05ZTdiLTQ1OTAtYWVjNi1iN2FhYjBhZmFmNTgiLCJlbWFpbCI6InplY2F1cnVidUBnbWFpbC5jb20uYnIiLCJqdGkiOiJjZWZhMjVkNS00N2VlLTRhODctYTdjMi1iMGI3NGRiY2UyMzgiLCJuYmYiOjE3MTk3OTM4MjQsImlhdCI6IjA3LzAxLzIwMjQgMDA6MzA6MjQiLCJleHAiOjE3MTk3OTc0MjQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJBdWRpZW5jZSJ9.zlTsGfHgOLzhRxEU-Oe_mFgDwWnhoaz3t0C1gEVunnX-hV1nwwlPQNp_ToA6thyNXsLneJUr8zZkfmWW7nWETQ";

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
  const inputFile = formData.get("inputFile") as File;
  const inputMsg = formData.get("msg") as string;

  let validatedFields = CreateMessageChat.safeParse({
    msg: inputMsg,
    file: inputFile.name !== "" ? inputFile : undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields Failed to Create Ticket",
    };
  }

  // console.log(validatedFields.data);

  // const { msg, file } = validatedFields.data;
  // if (file.name) console.log(file.name);
  // console.log(msg);

  // const newUrl = `${urlBaseApi}/tickets`;

  // fetch(newUrl, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     title: title,
  //     description: description,
  //     room: room,
  //     status: status,
  //     dt_creation: date,
  //   }),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // })
  //   // .then((response) => console.log(response))
  //   .then((error) => console.log(error));


}

export async function getAllMessages(id: string): Promise<Chat[]> {
  const data = await fetch("https://helpdesk-backend-muvo.onrender.com/api/chats/ticket/371577dc-96e6-4a07-a0e2-ccd4a72e5aa6", {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(data)

  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}