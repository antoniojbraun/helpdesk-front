import { Button, InputFile } from "../../button";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createMessageChatNew } from "@/app/lib/chat/serviceschat";
import { revalidatePath } from "next/cache";
import { MessageChatFormError } from "@/app/lib/definitions";

const styleCancelButton =
  "flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300";

export default function FormCreateMessages({ id }: { id: string }) {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [messageInput, setMessageInput] = useState<string>("");
  const [chatImagesInput, setChatImagesInput] = useState<File | undefined>(
    undefined
  );
  const [errors, setErrors] = useState<MessageChatFormError | undefined>();

  const inputTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files?.length > 0) {
      setFileName(event.target.files[0].name);
      setChatImagesInput(event.target.files[0]);
    } else {
      setFileName("");
    }
  }

  const handleTicketDescriptionInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInput(event.target.value);
  };

  const handleClick = () => {
    setTimeout(() => {
      if (inputTextAreaRef.current) inputTextAreaRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFileName("");
      revalidatePath;
      router.refresh;
    }, 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataForm = new FormData();
    dataForm.append("message", messageInput);
    dataForm.append("image", chatImagesInput!);
    const response = await createMessageChatNew(id, dataForm);

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
      router.refresh;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-[30px] px-[20px] flex flex-col">
      <div className="border-[2px] my-[12px]"></div>
      <label htmlFor="msg" className="ml-[10px] my-[5px]">
        Mensagem
      </label>
      <textarea
        onChange={handleTicketDescriptionInputChange}
        ref={inputTextAreaRef}
        aria-describedby="message-error"
        id="message"
        name="message"
        placeholder="Insira aqui sua mensagem..."
        className="p-[15px] border-[2px] border-neutral-900 border-opacity-20 rounded-md"
      />
      <div
        className="mb-4"
        id="message-error"
        aria-live="polite"
        aria-atomic="true">
        {errors?.message &&
          errors.message.map((error: string) => (
            <p key={error} className="mt-2 text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      <label htmlFor="anexo" className="ml-[10px] my-[5px]">
        Anexo
      </label>
      <InputFile
        fileInputRef={fileInputRef}
        fileName={fileName}
        handleFileChange={handleInputFile}
      />
      <div className="mt-1 flex flex-col items-end">
        <div
          className="mb-4"
          id="file-error"
          aria-live="polite"
          aria-atomic="true">
          {errors?.image &&
            errors.image.map((error: string) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
        </div>
        <Button onClick={handleClick} type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
}
