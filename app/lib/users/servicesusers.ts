"use server";

import { User, State } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(5, { message: "O nome é necessário com pelo menos 5 letra." }),
  email: z.string().email({ message: "Necessário inserir um email válido!" }),
  usertype: z.enum(["admin", "user", "support"], {
    message: "Necessário informar um tipo.",
  }),
  password: z.string(),
});

const CreateUser = FormSchema.omit({
  id: true,
  password: true,
});

export async function getAllUsers(): Promise<User[]> {
  const data = await fetch("http://localhost:3100/users", {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    usertype: formData.get("usertype"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para criar um usuário.",
    };
  }
  const { name, email, usertype } = validatedFields.data;

  fetch("http://localhost:3100/users", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      usertype: usertype,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // .then((response) => console.log(response))
    .catch((error) => console.log(`Erro ao criar usuário: ${error}`));
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}
