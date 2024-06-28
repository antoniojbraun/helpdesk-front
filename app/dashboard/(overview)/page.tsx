"use client";

import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id: string } }) {
  const data = useSession();
  const accessToken = data.data?.user;
  let isAdmin = null;
  let isUser = null;
  let isSupport = null;
  if (accessToken) {
    isAdmin = accessToken.role === 2;
    isSupport = accessToken.role === 1;
    isUser = accessToken.role === 0;
  }

  return (
    <main>
      Dashboard Home
      <p>
        Aqui vai mais algum conteúdo:{" "}
        {accessToken && "Bem vindo:" + accessToken.name}
      </p>
      <p>{isAdmin && "Tipo de Usuário: Administrador"}</p>
      <p>{isSupport && "Tipo de Usuário: Suporte"}</p>
      <p>{isUser && "Tipo de Usuário: Usuário"}</p>
    </main>
  );
}
