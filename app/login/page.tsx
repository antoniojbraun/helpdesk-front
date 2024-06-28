
import LoginForm from "../ui/login/login-form";
import "../ui/login/login.css";
import Image from "@/node_modules/next/image";
export default function LoginPage() {
  return (
    <main className="flex w-full">
      <div className="relative mx-auto flex md:flex-row flex-col items-center justify-center md:max-w-[800px] md:h-[450px] md:my-[100px]">
        <div className="flex items-center justify-center md:w-1/2 w-full md:h-full md:bg-white px-3 rounded-l-[10px]">
          <Image
            src="/login/img-login-support.png"
            width={330}
            height={330}
            className="hidden md:block"
            alt="Imagem página inicial do sistema Helpdesk"
          />
          <Image
            src="/login/img-login-support.png"
            width={200}
            height={200}
            className="block md:hidden"
            alt="Imagem página inicial do sistema Helpdesk"
          />
        </div>
        <div className="flex items-center w-[full] h-full md:w-[60%] px-4 py-[40px] bg-[#D5E6F7] md:rounded-r-[10px] md:rounded-l-[0px] rounded-[10px] ">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
