"use client";

import { useUserSession } from "@/app/context/SessionContext";
export default function Page({ params }: { params: { id: string } }) {
  const data = useUserSession();
  const accessToken = data?.user;
  console.log(data);
  let isAdmin = null;
  let isUser = null;
  let isSupport = null;
  if (accessToken) {
    isAdmin = accessToken.role === 2;
    isSupport = accessToken.role === 1;
    isUser = accessToken.role === 0;
    console.log(accessToken.token);
  }

  return (
    <main>
      Dashboard Home
      <p>
        Aqui vai mais algum conteúdo:{" "}
        {accessToken && "Bem vindo:" + accessToken.name}
      </p>
      <p>
        {isAdmin &&
          `Tipo de Usuário: Administrador. Seu Token é ${accessToken.token}`}
      </p>
      <p>{isSupport && "Tipo de Usuário: Suporte"}</p>
      <p>{isUser && "Tipo de Usuário: Usuário"}</p>
    </main>
  );
}
