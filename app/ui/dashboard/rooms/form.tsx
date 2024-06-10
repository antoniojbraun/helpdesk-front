"use client";

import { createRoom } from "@/app/lib/rooms/servicesrooms";
import Link from "@/node_modules/next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";

const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col items-start rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormCreateRoom() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRoom, initialState);

  return (
    <form action={dispatch}>
      <div className="w-full rounded-md bg-[#F1F2F3] p-6 space-y-[10px]">
        <div className={styleDivInputs}>
          <label htmlFor="name" className={styleLabel}>
            Nome<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            aria-describedby="name-error"
            placeholder="Digite o nome da sala..."
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
          <label htmlFor="descrição" className={styleLabel}>
            Descrição<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            aria-describedby="description-error"
            placeholder="Digite a descrição da sala..."
            className={styleInput}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/rooms" className={styleCancelButton}>
          Cancel
        </Link>
        <Button type="submit">Criar uma Sala</Button>
      </div>
    </form>
  );
}
