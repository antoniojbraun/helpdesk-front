"use client";

import Link from "@/node_modules/next/link";
import { Button, InputFile } from "../button";
import { Room, TicketFormError } from "@/app/lib/definitions";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createTicketNew } from "@/app/lib/tickets/servicesticket";

const styleLabel = " w-full py-[8px] ";
const styleInput = " rounded-md w-full py-[8px] px-[15px] ";
const styleDivInputs = "flex flex-col rounded-md";
const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";

export default function FormCreateTicket({
  listofrooms,
  userid,
}: {
  listofrooms: Room[];
  userid?: string;
}) {
  const router = useRouter();
  const [ticketTitleInput, setTicketTitleInput] = useState<string>("");
  const [ticketDescriptionINput, setTicketDescriptionInput] =
    useState<string>("");
  const [roomIdInput, setRoomIdInput] = useState<string>("");
  const [ticketImagesInput, setTicketImagesInput] = useState<File | undefined>(
    undefined
  );
  const [errors, setErrors] = useState<TicketFormError | undefined>();

  let room: string | null = null;
  let roomId = "";
  if (typeof window !== undefined) room = localStorage.getItem("room");

  if (room) {
    listofrooms.map((item) => {
      if (item.name.toLowerCase() == room!.toLowerCase())
        roomId = item.id.toString();
    });
  }
  const [fileName, setFileName] = useState("");
  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files?.length > 0) {
      setFileName(event.target.files[0].name);
      setTicketImagesInput(event.target.files[0]);
    } else {
      setFileName("");
    }
  }

  const handleTicketTitleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTicketTitleInput(event.target.value);
  };
  const handleTicketDescriptionInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTicketDescriptionInput(event.target.value);
  };

  const handleRoomIdInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomIdInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append("title", ticketTitleInput);
    dataForm.append("description", ticketDescriptionINput);
    dataForm.append("roomid", roomIdInput);
    dataForm.append("userid", userid!);
    dataForm.append("images", ticketImagesInput!);

    const response = await createTicketNew(dataForm);
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
      router.push("/dashboard/user/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-[#F1F2F3] p-6 space-y-[10px] w-full">
        <div className={styleDivInputs}>
          <label htmlFor="roomid" className={styleLabel}>
            Sala<span className="text-red-500">*</span>
          </label>
          <select
            onChange={handleRoomIdInputChange}
            name="roomid"
            id="roomid"
            aria-describedby="roomid-error"
            className={styleInput}
            defaultValue={roomId}>
            <option>Selecione a Sala</option>
            {listofrooms.map((item) => (
              <option value={item.id} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <div id="roomid-error" aria-live="polite" aria-atomic="true">
            {errors?.roomid &&
              errors.roomid.map((error: string) => (
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
            onChange={handleTicketTitleInputChange}
            type="text"
            id="title"
            name="title"
            aria-describedby="title-error"
            placeholder="Digite o título do chamado"
            className={styleInput}
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {errors?.title &&
              errors.title.map((error: string) => (
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
            onChange={handleTicketDescriptionInputChange}
            id="description"
            name="description"
            aria-describedby="description-error"
            placeholder="Explique o problema encontrado"
            className={styleInput}
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {errors?.description &&
              errors.description.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styleDivInputs}>
          <label htmlFor="images" className={styleLabel}>
            Anexo
          </label>
          <InputFile fileName={fileName} handleFileChange={handleInputFile} />
        </div>
        <div id="images-error" aria-live="polite" aria-atomic="true">
          {errors?.images &&
            errors.images.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/tickets" className={styleCancelButton}>
          Cancelar
        </Link>

        <Button type="submit">Criar um Chamado</Button>
      </div>
    </form>
  );
}
