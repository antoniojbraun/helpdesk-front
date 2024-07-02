"use client";

import { useUserSession } from "@/app/context/SessionContext";
export default function Page({ params }: { params: { id: string } }) {
  const data = useUserSession();
  let dadosSession = {
    user: {
      id: "",
      name: "",
      role: "",
      token: "",
      expirationDate: "",
    },
  };

  let isAdmin = false;
  let isUser = false;
  let isSupport = false;

  if (data) {
    dadosSession = JSON.parse(data);
    isAdmin = dadosSession.user.role == "2";
    isSupport = dadosSession.user.role == "1";
    isUser = dadosSession.user.role == "0";
  }

  return (
    <main>
      {data && (
        <div>
          {" "}
          Dashboard Home
          <p> Aqui vai mais algum conteúdo:</p>
          <p>{data && "Bem vindo:" + dadosSession.user.name}</p>
          <p>
            {isAdmin &&
              `Tipo de Usuário: Administrador. Seu Token é ${dadosSession.user.token}`}
          </p>
          <p>{isSupport && "Tipo de Usuário: Suporte"}</p>
          <p>{isUser && "Tipo de Usuário: Usuário"}</p>
        </div>
      )}
    </main>
  );
}
