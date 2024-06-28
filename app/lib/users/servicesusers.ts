"use server";

import { User, State, urlBaseApi, InitialState } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";

const urlUsers = `${urlBaseApi}/users`;

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

const UpdateUser = FormSchema.omit({
  id: true,
  password: true,
});

export async function getAllUsers(): Promise<User[]> {
  const data = await fetch(urlUsers, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getUserWithId(id: string) {
  const newUrl = `${urlUsers}/${id}`;

  const data = await fetch(newUrl, {
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

  fetch(urlUsers, {
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

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    usertype: formData.get("usertype"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para editar um usuário.",
    };
  }
  const { name, email, usertype } = validatedFields.data;
  const newUrl = `${urlUsers}/${id}`;
  fetch(newUrl, {
    method: "PUT",
    body: JSON.stringify({ name: name, email: email, usertype: usertype }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((error) => console.log(`Erro ao editar sala: ${error}`));
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

const FormSchemaCreatePublic = z.object({
  name: z
    .string()
    .min(5, { message: "O nome é necessário com pelo menos 5 letra." }),
  email: z.string().email({ message: "Necessário inserir um email válido!" }),
  password: z
    .string()
    .min(6, { message: "Conter ao menos 6 caracteres." })
    .refine((value) => /[a-z]/.test(value), {
      message: "Conter ao menos um caracter em caixa baixa ('a'-'z').",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Conter ao menos um caracter em caixa alta ('A'-'Z').",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Conter ao menos 6 caracteres." })
    .refine((value) => /[a-z]/.test(value), {
      message: "Conter ao menos um caracter em caixa baixa ('a'-'z').",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Conter ao menos um caracter em caixa alta ('A'-'Z').",
    }),
});

export async function createUserByUser(
  prevState: InitialState,
  formData: FormData
) {
  const validatedFields = FormSchemaCreatePublic.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para fazer um cadastro.",
    };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;
  const response = await fetch(`${urlBaseApi}/users`, {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmPassword }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    const errorData = response.json();
    console.error(`Erro ao cadastrar usuário: ${errorData}`);
  }
}
