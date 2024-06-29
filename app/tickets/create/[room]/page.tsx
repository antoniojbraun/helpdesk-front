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
    <main className="flex flex-col justify-start w-[500px] h-fit bg-[#D6E5F7] py-[40px] space-y-[20px] rounded-lg">
      <div className="px-[30px] space-y-4">
        <h1 className={`${poppins500.className} text-center text-[20px]`}>
          Identifique-se
        </h1>
        <p>Necessário identificar-se no sistema, para criar seu chamado.</p>
        <p>
          É novo por aqui? Faça seu cadastro clicando no botão logo abaixo =)
        </p>
      </div>
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
        <FormNewUser isVisible={formNewUserActive} />
        <FormLoginUser isVisible={loginActive} room={room} />
      </div>
    </main>
  );
}
