"use client";
import FormNewUser from "@/app/ui/tickets/formNewUser";
import { poppins500 } from "@/app/ui/fonts";
import ToggleCreateLogin from "@/app/ui/tickets/toggleCreateLogin";
import { useState } from "react";
import FormLoginUser from "@/app/ui/tickets/formLoginUser";

export default function Page({ params }: { params: { room: string } }) {
  const room = params.room;
  let [loginActive, setLoginActive] = useState(true);
  let [formNewUserActive, setFormNewUserActive] = useState(false);

  function handleToggleLogin() {
    setLoginActive(true);
    setFormNewUserActive(false);
  }

  function handleToggleNewUser() {
    setFormNewUserActive(true);
    setLoginActive(false);
  }
  return (
    <main className="flex flex-col w-[500px] h-auto bg-[#ECF6FF] p-[20px] space-y-[20px] rounded-md">
      <h1 className={`${poppins500.className} text-center text-[20px]`}>
        Identifique-se
      </h1>
      <p>Necessário identificar-se no sistema, para criar seu chamado.</p>
      <p>É novo por aqui? Faça seu cadastro clicando no botão logo abaixo =)</p>
      <div>
        <div className="flex flex-row mx-[20px] justify-end">
          <ToggleCreateLogin
            isActive={loginActive}
            rounded="rounded-tl-xl"
            primaryBgColor="bg-[#C1CFD9]"
            primaryTextColor="text-[#000000]"
            handleToggle={handleToggleLogin}>
            Login
          </ToggleCreateLogin>
          <ToggleCreateLogin
            isActive={formNewUserActive}
            rounded="rounded-tr-xl"
            primaryBgColor="bg-[#4B5C6B]"
            primaryTextColor="text-[#E5EAEE]"
            handleToggle={handleToggleNewUser}>
            Cadastrar
          </ToggleCreateLogin>
        </div>
        <FormNewUser isVisible={formNewUserActive} room={room} />
        <FormLoginUser isVisible={loginActive} room={room} />
      </div>
    </main>
  );
}
