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
    <main className="w-full">
      {data && (
        <div className="">
          {" "}
          Dashboard Home
          <p> Aqui vai mais algum conteúdo:</p>
          <p>{data && "Bem vindo:" + dadosSession.user.name}</p>
          <p>
            {isAdmin &&
              `Tipo de Usuário: Administrador. Seu Token é ${dadosSession.user.token}.
              Sua Data de Expiração é ${dadosSession.user.expirationDate}`}
          </p>
          {isSupport && (
            <div className=" overflow-x-hidden text-ellipsis whitespace-">
              <p>Tipo de Usuário: Suporte. Seu Token é</p>
              <p>${dadosSession.user.token}.</p>
              <p>Sua Data de Expiração é</p>
              <p> ${dadosSession.user.expirationDate}</p>
            </div>
          )}
          <p className=" overflow-x-hidden text-ellipsis whitespace-normal">
            {isUser &&
              `Tipo de Usuário: Usuário. Sua Data de Expiração é ${dadosSession.user.expirationDate}

              Seu Token é ${dadosSession.user.token}.
              `}
          </p>
        </div>
      )}
    </main>
  );
}
