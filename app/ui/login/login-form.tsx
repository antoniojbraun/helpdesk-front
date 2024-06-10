import { Button } from "../dashboard/button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { poppins600 } from "../fonts";

export default function LoginForm() {
  return (
    <form className="flex justify-center w-full">
      <div className="flex flex-col items-center w-[90%]">
        <h1 className={`${poppins600.className} text-[30px] text-[#283845]`}>
          HelpDesk
        </h1>
        {/* <h4 className="mb-3 text-slate-600 font-bold text-[#899BA8] mt-0.2">
          Área do usuário
        </h4> */}
        <p className="text-center my-[10px]">
          Faça seu login preenchendo os campos abaixo:
        </p>

        <div className="flex flex-col w-full">
          <div className="relative flex flex-col">
            <label htmlFor="email" className="mb-[5px]">
              Email
            </label>
            <input
              placeholder="Digite seu email"
              type="email"
              className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[42px] text-gray-500 peer-focus:text-gray-900" />
          </div>

          <div className="flex flex-col relative mt-[15px] mb-[10px]">
            <label htmlFor="password" className="mb-[5px]">
              Senha
            </label>
            <input
              placeholder="Digite sua senha"
              type="password"
              className="rounded border border-gray-400 py-[11px] pl-10 text-sm placeholder:text-gray-500"
            />
            <KeyIcon className="pointer-events-none absolute left-2 h-[18px] w-[18px] top-[41px] text-gray-500 peer-focus:text-gray-900" />
          </div>
          <LoginButton />
          <div>{/* Seção que irá exibir os erros de login */}</div>
          <div className="mt-[20px] text-[11px] text-gray-600 text-center">
            Ainda não é cadastrado?{" "}
            <span className="text-blue-600">Faça seu cadastro aqui</span>
          </div>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
