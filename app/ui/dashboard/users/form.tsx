"use client";

import { createUserNew } from "@/app/lib/users/servicesusers";
import Link from "@/node_modules/next/link";
import { Button } from "../button";
import { CreateUserFormErrors, initialState } from "@/app/lib/definitions";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
initialState;
const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col items-start rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormCreateUser() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [userConfirmPassord, setUserPasswordConfirm] = useState<string>("");
  const [errors, setErrors] = useState<CreateUserFormErrors | undefined>();

  const handleUserNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleUserEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handleUserPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const handleUserConfirmPasswordInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUserPasswordConfirm(event.target.value);
  };

  const handleUserTypeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append("name", userName);
    dataForm.append("email", userEmail);
    dataForm.append("password", userPassword);
    dataForm.append("confirmPassword", userConfirmPassord);
    dataForm.append("userType", userType);

    const response = await createUserNew(dataForm);
    if (response?.errors) {
      setErrors(response?.errors);
      return;
    }

    if (!response?.status) {
      alert(response?.msg);
      return;
    }

    if (response?.status) {
      alert(response?.msg);
      router.push("/dashboard/admin/users");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full rounded-md bg-[#F1F2F3] p-6 space-y-[10px]">
        <div className={styleDivInputs}>
          <label htmlFor="name" className={styleLabel}>
            Nome Completo<span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleUserNameInput}
            type="text"
            id="name"
            name="name"
            aria-describedby="name-error"
            placeholder="Digite o nome do usuário"
            className={styleInput}
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors?.name &&
              errors.name.map((error: string) => (
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
            onChange={handleUserEmailInput}
            type="text"
            id="email"
            name="email"
            aria-describedby="email-error"
            placeholder="Digite o email do usuário"
            className={styleInput}
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
          <label htmlFor="password" className={styleLabel}>
            Senha<span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleUserPasswordInput}
            type="password"
            id="password"
            name="password"
            aria-describedby="password-error"
            placeholder="Digite a senha do novo usuário"
            className={styleInput}
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {errors?.password &&
              errors.password.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="confirmPassword" className={styleLabel}>
            Confirme a senha<span className="text-red-500">*</span>
          </label>
          <input
            onChange={handleUserConfirmPasswordInput}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            aria-describedby="confirmPassword-error"
            placeholder="Confirme a senha do novo usuário"
            className={styleInput}
          />
          <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
            {errors?.confirmPassword &&
              errors.confirmPassword.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="userType" className={styleLabel}>
            Tipo<span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-[7px]" aria-describedby="type-error">
            <input
              onChange={handleUserTypeInput}
              type="radio"
              id="userType"
              name="userType"
              className=""
              value="2"
              checked={userType === "2"}
            />
            <label htmlFor="userType">Admin</label>
          </div>
          <div className="flex space-x-[7px]">
            <input
              onChange={handleUserTypeInput}
              type="radio"
              id="userType"
              name="userType"
              className=""
              value="0"
              checked={userType === "0"}
            />
            <label htmlFor="userType">Usuário</label>
          </div>
          <div className="flex space-x-[7px]">
            <input
              onChange={handleUserTypeInput}
              type="radio"
              id="userType"
              name="userType"
              className=""
              value="1"
              checked={userType === "1"}
            />
            <label htmlFor="userType">Suporte</label>
          </div>
          <div id="userType-error" aria-live="polite" aria-atomic="true">
            {errors?.userType &&
              errors.userType.map((error: string) => (
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
        <Button type="submit">Criar um Usuário</Button>
      </div>
    </form>
  );
}
