import { Button } from "./button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

export default function LoginForm() {
  return (
    <form className="flex items-center flex-col ">
      <h1 className="text-[30px] font-extrabold text-[#283845]">HelpDesk</h1>
      <h4 className="mb-3 text-slate-600 font-bold">Área do usuário</h4>
      <p className="text-center mb-5">
        Faça seu login preenchendo os campos abaixo:
      </p>

      <div className="flex flex-col w-full">
        <label htmlFor="email">Email</label>
        <input type="email" />
        <label htmlFor="password">Senha</label>
        <input type="password" />
        <LoginButton />
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
