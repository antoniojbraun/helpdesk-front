"use client";

import { createTicket } from "@/app/lib/tickets/servicesticket";
import Link from "@/node_modules/next/link";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { Room } from "@/app/lib/definitions";
import { useState } from "react";
const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col items-start rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormCreateTicket({
  listofrooms,
}: {
  listofrooms: Room[];
}) {
  const [isEditable, setIsEditable] = useState(false);

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTicket, initialState);
  let room: string | null = null;
  let roomId = "0";

  if (typeof window !== undefined) room = localStorage.getItem("room");
  if (room) {
    listofrooms.map((item) => {
      if (item.name.toLowerCase() == room!.toLowerCase())
        roomId = item.id.toString();
    });
  }

  return (
    <form action={dispatch}>
      <div className="w-full rounded-md bg-[#F1F2F3] p-6 space-y-[10px]">
        <div className={styleDivInputs}>
          <label htmlFor="room" className={styleLabel}>
            Sala<span className="text-red-500">*</span>
          </label>
          <select
            name="room"
            id="room"
            aria-describedby="room-error"
            className={styleInput}
            defaultValue={roomId}>
            <option value="0">Selecione a Sala</option>
            {listofrooms.map((item) => (
              <option value={item.id} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div id="room-error" aria-live="polite" aria-atomic="true">
            {state.errors?.room &&
              state.errors.room.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="title" className={styleLabel}>
            Título<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            aria-describedby="title-error"
            placeholder="Digite o título do chamado."
            className={styleInput}
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="description" className={styleLabel}>
            Descrição<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            aria-describedby="description-error"
            placeholder="Explique em poucas palavras o problema.."
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
        <div className="hidden">
          <label htmlFor="Status" className={styleLabel}>
            Status
          </label>
          <input
            type="radio"
            id="status"
            name="status"
            className=""
            value="Pendente"
            checked
            readOnly
          />
          <label htmlFor="status">Pendente</label>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="ticket_img" className={styleLabel}>
            Anexo
          </label>
          <input
            type="file"
            id="ticket_img"
            name="ticket_img"
            className="w-full"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/tickets" className={styleCancelButton}>
          Cancel
        </Link>

        <Button type="submit">Criar um Chamado</Button>
      </div>
    </form>
  );
}
