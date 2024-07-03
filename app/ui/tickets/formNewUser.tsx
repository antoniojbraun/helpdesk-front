import React from "react";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../dashboard/button";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { urlBaseApi } from "@/app/lib/definitions";

interface FormNewUserProps {
  isVisible: boolean;
}

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);

export const FormSchemaCreateUserPublic = z
  .object({
    name: z
      .string()
      .min(5, { message: "O nome é necessário com pelo menos 5 letras." }),
    email: z.string().email({ message: "Necessário inserir um email válido!" }),
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

const FormNewUser: React.FC<FormNewUserProps> = ({ isVisible }) => {
  const visibleOrNot = isVisible ? " block" : " hidden";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    | {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      }
    | undefined
  >(undefined);

  const handleCreateNewUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = FormSchemaCreateUserPublic.safeParse({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (!validatedFields.success) {
      setFieldErrors(validatedFields.error?.flatten().fieldErrors);
      return;
    }

    const response = await fetch(`${urlBaseApi}/users`, {
      method: "POST",
      body: JSON.stringify({ name, email, password, confirmPassword }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Erro ao fazer cadastro: ${errorData}`);
      alert(response.status);
      return;
    }
    handleLogin();
  };

  const handleLogin = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (response?.error) {
      alert("aaaaaa");
      return;
    }
    if (response?.ok) {
      router.refresh();
      router.push("/dashboard/user/tickets/create/");
    }
  };
  return (
    <form
      onSubmit={handleCreateNewUser}
      className={` mx-5 px-[20px] pb-[20px]  bg-[#4B5C6B] rounded-b-lg rounded-tl-lg ${visibleOrNot}`}>
      <div className="flex flex-col relative pt-[15px] pb-[7px]">
        <label htmlFor="firstname" className="text-[#E5EAEE]">
          Nome:
        </label>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Digite seu nome"
          aria-describedby="name-error"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <UserCircleIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {fieldErrors?.name &&
          fieldErrors.name.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-[#E5EAEE]">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col relative pt-[15px] pb-[7px]">
        <label htmlFor="email" className="text-[#E5EAEE]">
          Email:
        </label>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Digite seu Email"
          aria-describedby="email-error"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="email-error" aria-live="polite" aria-atomic="true">
        {fieldErrors?.email &&
          fieldErrors.email.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-[#E5EAEE]">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col relative mt-[15px] pb-[7px]">
        <label htmlFor="password" className="text-[#E5EAEE]">
          Senha
        </label>
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          type="password"
          name="password"
          aria-describedby="password-error"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[35px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="password-error" aria-live="polite" aria-atomic="true">
        {fieldErrors?.password &&
          fieldErrors.password.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-[#E5EAEE]">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col relative mt-[15px] pb-[7px]">
        <label htmlFor="password" className="text-[#E5EAEE]">
          Confirme sua senha
        </label>
        <input
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua senha"
          type="password"
          name="confirmPassword"
          aria-describedby="confirmPassword-error"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[35px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
        {fieldErrors?.confirmPassword &&
          fieldErrors.confirmPassword.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-[#E5EAEE]">
              {error}
            </p>
          ))}
      </div>
      <Button className="mt-4 w-full">
        Criar conta <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <input type="checkbox" id="agreement" required />
        <label htmlFor="agreement" className="text-[10px] text-[#E5EAEE]">
          Concordo com os termos de serviço.
        </label>
      </div>
    </form>
  );
};

export default FormNewUser;
