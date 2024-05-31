"use client";

import Link from "@/node_modules/next/link";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  urlDestino: String;
}

export function CreateButton({ children, urlDestino }: ButtonProps) {
  return (
    <Link
      href={`${urlDestino}`}
      className="flex h-10 items-center rounded-lg bg-[#1AAE9F] px-5 text-white transition-colors hover:bg-[#2dc2b3] active:bg-[#5fd4c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C87D9]">
      <span>{children}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateButtonTable({ slug, id }: { id: string; slug: string }) {
  return (
    <Link
      href={`/dashboard/${slug}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButtonTable({ slug, id }: { id: string; slug: string }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={`/api/${slug}/${id}/`}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ViewButtonTable({ slug, id }: { id: string; slug: string }) {
  return (
    <Link
      href={`/dashboard/${slug}/${id}/`}
      className="rounded-md border p-2 hover:bg-gray-100">
      <EyeIcon className="w-5" />
    </Link>
  );
}
