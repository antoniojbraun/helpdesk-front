import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import { poppins500 } from "../fonts";
export default function Logo() {
  return (
    <Link
      className="flex items-center space-x-[3px] text-[#2C88D9]"
      href="/dashboard/">
      <Image
        src="/dashboard/icon-headset-blue.png"
        width={22}
        height={22}
        className=""
        alt="Screenshots of the dashboard project showing desktop versions"
      />
      <h1 className={`${poppins500.className} text-[20px]`}>Helpdesk</h1>
    </Link>
  );
}
