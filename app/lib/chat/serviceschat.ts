import { State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

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
