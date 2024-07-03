"use server";

import { User, State, urlBaseApi, InitialState } from "../definitions";
import { z } from "zod";
import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { getDataSession } from "../utils";

const urlUsers = `${urlBaseApi}/users`;

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);

const FormSchema = z
  .object({
    name: z
      .string()
      .min(5, { message: "O nome é necessário com pelo menos 5 letra." }),
    email: z.string().email({ message: "Necessário inserir um email válido!" }),
    userType: z.enum(["0", "1", "2"], {
      message: "Necessário informar um tipo.",
    }),
    password: z.string().regex(passwordValidation, {
      message:
        "Senhas devem conter ao menos 6 letras, sendo: 1 maiúscula, 1 minúscula, 1 número e 1 caracter especial.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export async function getAllUsers() {
  const data = await fetch("http://localhost:3100/users", {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function getAllUsersAPI(token?: string): Promise<User[]> {
  const response = await fetch(urlUsers, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.error(`Erro ao buscar dados: ${errorData}`);
  }
  return response.json();
}

export async function getUserWithId(id: string) {
  const session = await getDataSession();
  const token = session?.token;
  const newUrl = `${urlUsers}/${id}`;

  const data = await fetch(newUrl, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}

export async function createUser(prevState: State, formData: FormData) {
  const session = await getDataSession();
  const token = session?.token;

  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    userType: formData.get("userType"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para criar um usuário.",
    };
  }

  let { name, email, password, confirmPassword, userType } =
    validatedFields.data;

  const response = await fetch(`${urlBaseApi}/users/admcreate`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userType: userType,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const dataError = response.json();
    console.error(`Erro ao criar usuário: ${dataError}`);
  }
  revalidatePath("/dashboard/admin/users");
  redirect("/dashboard/admin/users");
}

export async function createUserNew(formData: FormData) {
  const session = await getDataSession();
  const token = session?.token;

  const dataForm = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    userType: formData.get("userType"),
  };
  const validatedFields = FormSchema.safeParse(dataForm);

  if (!validatedFields.success) {
    return {
      status: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  let userTypeConverted = Number(dataForm.userType);
  const { name, email, password, confirmPassword, userType } =
    validatedFields.data;
  console.log(
    JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userType: userTypeConverted,
    })
  );
  const response = await fetch(`${urlBaseApi}/users/admcreate`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userType: userTypeConverted,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    return {
      status: false,
      msg: `Erro ao cadastrar usuário: ${errorData.error}`,
    };
  }
  revalidatePath("/dashboard/admin/users");
  return {
    status: true,
    msg: "Usuário cadastrado com sucesso",
  };
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPasswotd: formData.get("confirmPassword"),
    usertype: formData.get("usertype"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Necessário preencher todos os dados para editar um usuário.",
    };
  }
  const { name, email, userType } = validatedFields.data;
  const newUrl = `${urlUsers}/${id}`;
  fetch(newUrl, {
    method: "PUT",
    body: JSON.stringify({ name: name, email: email, usertype: userType }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).catch((error) => console.log(`Erro ao editar sala: ${error}`));
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUserApi(userId: string) {
  const getDataUserLogged = await getDataSession();
  const token = getDataUserLogged?.token;

  let newUrlDelete = `${urlBaseApi}/users/${userId}`;

  const response = await fetch(newUrlDelete, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
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
    msg: "Usuário deletado com sucesso!",
  };
}
