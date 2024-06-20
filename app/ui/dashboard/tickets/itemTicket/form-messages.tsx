import { Button, InputFile } from "../../button";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { createMessageChat } from "@/app/lib/chat/serviceschat";

const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";
export default function FormCreateMessages({ id }: { id: string }) {
  const [fileName, setFileName] = useState("");
  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files?.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  }
  const initialState = { message: null, errors: {} };
  const createMessageChatWithId = createMessageChat.bind(null, id);
  const [state, dispatch] = useFormState(createMessageChatWithId, initialState);
  
  return (
    <form action={dispatch} className="py-[30px] px-[20px] flex flex-col">
      <div className="border-[2px] my-[12px]"></div>
      <label htmlFor="msg" className="ml-[10px] my-[5px]">
        Mensagem
      </label>
      <textarea
        aria-describedby="msg-error"
        id="msg"
        name="msg"
        placeholder="Insira aqui sua mensagem..."
        className="p-[15px] border-[2px] border-neutral-900 border-opacity-20 rounded-md"
      />
      <div
        className="mb-4"
        id="msg-error"
        aria-live="polite"
        aria-atomic="true">
        {state.errors?.msg &&
          state.errors.msg.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="anexo" className="ml-[10px] my-[5px]">
        Anexo
      </label>
      <InputFile fileName={fileName} handleFileChange={handleInputFile} />
      <div className="mt-1 flex flex-col items-end">
        <div
          className="mb-4"
          id="file-error"
          aria-live="polite"
          aria-atomic="true">
          {state.errors?.file &&
            state.errors.file.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
}
