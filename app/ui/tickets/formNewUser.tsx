import React from "react";
import { poppins500 } from "../fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "@/node_modules/next/link";
import { Button } from "../dashboard/button";

interface FormNewUserProps {
  isVisible: boolean;
  room: string;
}

const FormNewUser: React.FC<FormNewUserProps> = ({ isVisible, room }) => {
  const visibleOrNot = isVisible ? " block" : " hidden";

  return (
    <form
      action=""
      className={` mx-5 px-[20px] pb-[20px] text-[#FFF] bg-[#4B5C6B] rounded-b-lg rounded-tl-lg ${visibleOrNot}`}>
      <div className="flex flex-col relative pt-[15px] pb-[7px]">
        <label htmlFor="firstname">Nome:</label>
        <input
          type="firstname"
          placeholder="Digite seu primeiro nome"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <UserCircleIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-col relative pt-[15px] pb-[7px] ">
        <label htmlFor="lastname">Sobrenome:</label>
        <input
          type="lastname"
          placeholder="Digite seu sobrenome"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <UserCircleIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-col relative pt-[15px] pb-[7px]">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Digite seu Email"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-col relative mt-[15px] pb-[7px]">
        <label htmlFor="password">Senha</label>
        <input
          placeholder="Digite sua senha"
          type="password"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[35px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="mt-[15px] flex justify-end">
        <Button type="submit">Criar conta</Button>
      </div>
    </form>
  );
};

export default FormNewUser;
