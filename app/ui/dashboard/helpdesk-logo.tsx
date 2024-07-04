import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { poppins500 } from "../fonts";
import { useUserSession } from "@/app/context/SessionContext";
export default function Logo() {
  let session = useUserSession();
  let slug = "";

  if (session) {
    let userDataSession = JSON.parse(session);
    let role = JSON.stringify(userDataSession.user.role);

    console.log(`O tipo de role é ${role}`);

    switch (role) {
      case "0":
        slug = "user";
        break;
      case "1":
        slug = "support";
        break;
      default:
        slug = "admin";
    }
  }
  return (
    <Link
      className="flex items-center space-x-[3px] text-[#2C88D9]"
      href={`/dashboard/${slug}/tickets`}>
      <Image
        src="/imgs/icon-headset-blue.png"
        width="22"
        height="23"
        className=""
        alt="Screenshots of the dashboard project showing desktop versions"
      />
      <h1 className={`${poppins500.className} text-[20px]`}>Helpdesk</h1>
    </Link>
  );
}
