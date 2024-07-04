"use client";

import { Button } from "../dashboard/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { poppins600 } from "../fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const { data: session } = useSession();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log("[LOGIN_RESPONSE]: " + response?.status);
    if (!response?.error) {
      router.refresh();

      router.push("/dashboard/");
    } else {
      setError("Email e/ou senha inválido(s)");
      console.log("[LOGIN_ERROR]: ", response.error);
    }
  };

  useEffect(() => {
    if (session) {
      const sessionDataString = JSON.stringify(session.user.role);

      switch (sessionDataString) {
        case "0":
          router.push("/dashboard/user/tickets");
          break;
        case "1":
          router.push("/dashboard/support/tickets");
          break;
        default:
          router.push("/dashboard/admin/tickets");
          break;
      }
    }
  }, [session, router]);
  return (
    <form onSubmit={handleLogin} className="flex justify-center w-full">
      <div className="flex flex-col items-center w-[90%]">
        <h1 className={`${poppins600.className} text-[30px] text-[#283845]`}>
          HelpDesk
        </h1>
        {/* <h4 className="mb-3 text-slate-600 font-bold text-[#899BA8] mt-0.2">
          Área do usuário
        </h4> */}
        <p className="text-center my-[10px]">
          Faça seu login preenchendo os campos abaixo:
        </p>

        <div className="flex flex-col w-full">
          <div className="relative flex flex-col">
            <label htmlFor="email" className="mb-[5px]">
              Email
            </label>
            <input
              required
              placeholder="Digite seu email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[42px] text-gray-500 peer-focus:text-gray-900" />
          </div>

          <div className="flex flex-col relative mt-[15px] mb-[10px]">
            <label htmlFor="password" className="mb-[5px]">
              Senha
            </label>
            <input
              required
              placeholder="Digite sua senha"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
            />
            <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[41px] text-gray-500 peer-focus:text-gray-900" />
          </div>
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
        </div>
      </div>
    </form>
  );
}
