import { InputFile } from "../../button";

export default function FormCreateMessagesInative() {
  return (
    <form className="py-[30px] px-[20px] flex flex-col">
      <div className="border-[2px] my-[12px]"></div>
      <label htmlFor="msg" className="ml-[10px] my-[5px]">
        Mensagem
      </label>
      <textarea
        disabled
        aria-describedby="msg-error"
        id="msg"
        name="msg"
        placeholder="Insira aqui sua mensagem..."
        className="p-[15px] border-[2px] border-neutral-900 border-opacity-20 rounded-md"
      />

      <label htmlFor="anexo" className="ml-[10px] my-[5px]">
        Anexo
      </label>
      <div className="flex justify-end border-[2px] border-neutral-900 border-opacity-20 rounded-md bg-gray-100">
        <div className="h-full py-[6px] px-[20px]">
          <p></p>
        </div>
        <label
          htmlFor="inputFile"
          className="flex py-[6px] px-[20px] bg-[#C2CFD9] cursor-pointer">
          Selecionar arquivo
        </label>
      </div>

      <div className="mt-1 flex flex-col items-end">
        <p className="py-2 px-4 mt-4 bg-gray-300 rounded cursor-pointer">
          Enviar
        </p>
      </div>
    </form>
  );
}
