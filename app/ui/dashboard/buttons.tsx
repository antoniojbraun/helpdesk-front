'use client'

import Link from "@/node_modules/next/link";
import { PlusIcon } from "@heroicons/react/24/outline";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  urlDestino: String;
}

export function CreateButton({ children, urlDestino }: ButtonProps) {
  return (
    <Link
      href={`${urlDestino}`}
      className="flex h-10 items-center rounded-lg bg-[#2C87D9] px-5 text-white transition-colors hover:bg-[#3390e1] active:bg-[#60aef2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C87D9]">
      <span>{children}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

