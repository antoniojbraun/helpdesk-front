"use client";

import { updateUser } from "@/app/lib/users/servicesusers";
import { User } from "@/app/lib/definitions";
import Link from "@/node_modules/next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";

const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col items-start rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormEditUser({ user }: { user: User }) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  // const [state, dispatch] = useFormState(updateUserWithId, initialState);
  const adminType = user.userType === "Administrador";
  const userType = user.userType === "Usuário";
  const supportType = user.userType === "Suporte";

  return (
    <form>
      {/* <div className="w-full rounded-md bg-[#F1F2F3] p-6 space-y-[10px]">
        <div className={styleDivInputs}>
          <label htmlFor="name" className={styleLabel}>
            Nome Completo<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            aria-describedby="name-error"
            placeholder="Digite o nome do usuário"
            className={styleInput}
            defaultValue={user.name}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors?.name &&
              name.map((error: string) => (
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
            placeholder="Digite o email do usuário"
            className={styleInput}
            defaultValue={user.email}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {errors?.email &&
              errors.email.map((error: string) => (
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
              defaultChecked={adminType}
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
              defaultChecked={userType}
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
              defaultChecked={supportType}
            />
            <label htmlFor="usertype">Suporte</label>
          </div>
          <div id="usertype-error" aria-live="polite" aria-atomic="true">
            {errors?.usertype &&
              errors.usertype.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/admin/users" className={styleCancelButton}>
          Cancelar
        </Link>
        <Button type="submit">Editar Usuário</Button>
      </div> */}
    </form>
  );
}
