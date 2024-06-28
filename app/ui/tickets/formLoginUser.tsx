import React, { useState } from "react";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../dashboard/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormLoginUserProps {
  isVisible: boolean;
  room: string;
}

const FormLoginUser: React.FC<FormLoginUserProps> = ({ isVisible, room }) => {
  const visibleOrNot = isVisible ? " block" : " hidden";
  if (room) {
    if (typeof window !== "undefined") {
      localStorage.setItem("room", room);
    }
  }
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log("[LOGIN_RESPONSE]: " + response);
    if (!response?.error) {
      router.refresh();
      router.push("/dashboard/user/tickets/create/");
    } else {
      setError("Email e/ou senha inválido(s)");
      console.log("[LOGIN_ERROR]: ", response.error);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className={` mx-5 px-[20px] pb-[20px] bg-[#C1CFD9] rounded-b-lg rounded-tl-lg ${visibleOrNot}`}>
      <div className="flex flex-col relative pt-[15px] mb-[7px]">
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu Email"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-col relative mt-[15px] mb-[7px]">
        <label htmlFor="password">Senha</label>
        <input
          required
          placeholder="Digite sua senha"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[35px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      {/* <div className="mt-[15px] flex w-full">
        <Button className="w-full flex justify-center" type="submit">
          Logar na conta
        </Button>
      </div> */}
      <Button className="mt-4 w-full">
        Entrar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div className="flex gap-2 mt-3 text-sm justify-center">
        {/* Seção que irá exibir os erros de login */}
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default FormLoginUser;
