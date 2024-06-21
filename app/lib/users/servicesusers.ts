"use server";

import { User, State, urlBaseApi } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect, RedirectType } from "@/node_modules/next/navigation";

const urlUsers = `${urlBaseApi}/users`;

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(5, { message: "O nome é necessário com pelo menos 5 letra." }),
  email: z.string().email({ message: "Necessário inserir um email válido!" }),
  userType: z.enum(["2", "0", "1"], {
    message: "Necessário informar um tipo.",
  }),
  password: z.string().min(5, {
    message: "A senha deve conter: min 5 caracteres.",
  }),
  confirmPassword: z.string().min(5, {
    message: "A senha deve conter: min 5 caracteres.",
  }),
});

const CreateUser = FormSchema.omit({
  id: true,
});

const UpdateUser = FormSchema.omit({
  id: true,
  password: true,
  confirmPassword: true,
});

export async function getAllUsers(): Promise<User[]> {
  const data = await fetch(urlUsers, {
    // cache: "force-cache",
    next: { revalidate: 10 },
  });
  if (!data.ok) throw new Error("Erro ao buscar lista de usuários!");
  return data.json();
}

export async function getUserWithId(id: string) {
  const newUrl = `${urlUsers}/${id}`;
  const data = await fetch(newUrl, {
    cache: "force-cache",
  });
  if (!data.ok) throw new Error("Erro ao buscar usuário pelo ID!");
  return data.json();
}

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    userType: formData.get("userType"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para criar um usuário.",
    };
  }
  let { name, email, userType, password } = validatedFields.data;

  userType = parseInt(userType);
  const response = await fetch(urlUsers, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      userType: userType,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao cadastrar usuário: ${errorData.error}`);
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users", RedirectType.push);
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    userType: formData.get("userType"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para editar um usuário.",
    };
  }
  let { name, email, userType } = validatedFields.data;
  userType = parseInt(userType);

  const newUrl = `${urlUsers}/${id}`;
  const response = await fetch(newUrl, {
    method: "PATCH",
    body: JSON.stringify({ name: name, email: email, userType: userType }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function createUserByUser(formData: FormData) {}
