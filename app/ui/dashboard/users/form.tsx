"use client";

import { createUser } from "@/app/lib/users/servicesusers";
import Link from "@/node_modules/next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";

const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col items-start rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormCreateUser() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div className="w-full rounded-md bg-[#F1F2F3] p-6 space-y-[10px]">
        <div className={styleDivInputs}>
          <label htmlFor="name" className={styleLabel}>
            Nome Completo<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            aria-describedby="name-error"
            placeholder="Digite o nome do usuário."
            className={styleInput}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="email" className={styleLabel}>
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email"
            name="email"
            aria-describedby="email-error"
            placeholder="Digite o email do usuário."
            className={styleInput}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className={styleDivInputs}>
          <label htmlFor="usertype" className={styleLabel}>
            Tipo<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-[7px]" aria-describedby="type-error">
            <input
              type="radio"
              id="usertype"
              name="usertype"
              className=""
              value="admin"
            />
            <label htmlFor="usertype">Admin</label>
          </div>
          <div className="flex space-x-[7px]">
            <input
              type="radio"
              id="usertype"
              name="usertype"
              className=""
              value="user"
            />
            <label htmlFor="usertype">Usuário</label>
          </div>
          <div className="flex space-x-[7px]">
            <input
              type="radio"
              id="usertype"
              name="usertype"
              className=""
              value="support"
            />
            <label htmlFor="usertype">Suporte</label>
          </div>
          <div id="usertype-error" aria-live="polite" aria-atomic="true">
            {state.errors?.usertype &&
              state.errors.usertype.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/users" className={styleCancelButton}>
          Cancel
        </Link>
        <Button type="submit">Criar um Usuário</Button>
      </div>
    </form>
  );
}
