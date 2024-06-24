import React from "react";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Button } from "../dashboard/button";
import { initialState } from "@/app/lib/definitions";
import { useFormState } from "react-dom";
import { loginUser } from "@/app/lib/users/servicesusers";

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

  const loginUserWithRoom = loginUser.bind(null, room);
  const [state, dispatch] = useFormState(loginUserWithRoom, initialState);

  return (
    <form
      action={dispatch}
      className={` mx-5 px-[20px] pb-[20px] bg-[#C1CFD9] rounded-b-lg rounded-tl-lg ${visibleOrNot}`}>
      <div className="flex flex-col relative pt-[15px] mb-[7px]">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu Email"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[52px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="flex flex-col relative mt-[15px] mb-[7px]">
        <label htmlFor="password">Senha</label>
        <input
          placeholder="Digite sua senha"
          type="password"
          name="password"
          className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
        />
        <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[35px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="mt-[15px] flex justify-end">
        <Button type="submit">Logar na conta</Button>
      </div>
    </form>
  );
};

export default FormLoginUser;
