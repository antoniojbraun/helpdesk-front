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
  if (session) {
    const dadosSession = JSON.parse(session);
    firstname = getFirstName(dadosSession.user.name);
  }
  return (
    <div className="flex space-x-2 items-center">
      <UserCircleIcon className="size-6 text-[#2C88D9]" />
      <p className={`text-[#2C88D9] ${poppins600.className} text-[18px]`}>
        {firstname}
      </p>
    </div>
  );
}
