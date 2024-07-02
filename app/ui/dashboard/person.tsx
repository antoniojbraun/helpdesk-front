import { poppins600 } from "../fonts";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useUserSession } from "@/app/context/SessionContext";
const getFirstName = (fullName: string) => {
  if (!fullName) return "";
  return fullName.split(" ")[0];
};
export default function Person() {
  const session = useUserSession();
  let firstname = "";
  let userType = "";
  if (session) {
    const dadosSession = JSON.parse(session);
    console.log(dadosSession);
    firstname = getFirstName(dadosSession.user.name);
    userType =
      dadosSession.user.role == 1
        ? "- Suporte"
        : dadosSession.user.role == 2
        ? "- Administrador"
        : "";
  }
  return (
    <div className="flex space-x-2 items-center">
      <UserCircleIcon className="size-6 text-[#2C88D9]" />
      <p className={`text-[#2C88D9] ${poppins600.className} text-[18px]`}>
        {firstname} {userType}
      </p>
    </div>
  );
}
