import { poppins600 } from "../fonts";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Person() {
  return (
    <div className="flex space-x-2 items-center">
      <UserCircleIcon className="size-6 text-[#2C88D9]" />
      <p className={`text-[#2C88D9] ${poppins600.className} text-[18px]`}>
        Antonio
      </p>
    </div>
  );
}
