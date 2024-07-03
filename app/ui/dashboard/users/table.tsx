"use client";

import { DeleteButtonGeneric, UpdateButtonTable } from "../buttons";
import { User } from "@/app/lib/definitions";
import { poppins500 } from "../../fonts";
import { deleteGeneric } from "@/app/lib/servicesgenerics";
import { deleteUserApi } from "@/app/lib/users/servicesusers";
import { useRouter } from "next/navigation";
const styleThDefault = "px-3 py-5 font-medium";
const styleTdDefault = "whitespace-nowrap px-3 py-1";

export default function TableUsers({ data }: { data: User[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const userConfirmed = confirm("Tem certeza que quer apagar esse usuário?");
    if (userConfirmed) {
      const response = await deleteUserApi(id);
      alert(response.msg);
      router.refresh();
    }
  };

  return (
    <div className="mt-6 flex flex-root justify-center">
      <div className="inline-block align-middle min-w-full">
        <div className="rounded-xl  bg-[#f1f2f3] p-3 md:pt-0 ">
          {/* Aqui vai a versão mobile da tabela */}
          <div className="md:hidden">
            <div className="h-[20px]"></div>
            {data.map((item, indice) => {
              return (
                <div
                  className="mb-2 w-full rounded-md bg-white p-4"
                  key={indice}>
                  <div className="border-b pb-4">
                    <div className="mb-2 flex flex-row justify-between">
                      <p>
                        {item.name} - {item.userType}
                      </p>
                      <p className={`${poppins500.className}`}>#{indice + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <p>{item.email}</p>
                    <div className="flex justify-end gap-2 ml-[3px]">
                      {/* <UpdateButtonTable id={item.id} slug="admin/users" /> */}

                      <DeleteButtonGeneric
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Aqui vai a versão desktop da tabela */}
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal ">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className={styleThDefault}>
                  Nome
                </th>
                <th scope="col" className={styleThDefault}>
                  Email
                </th>
                <th scope="col" className={styleThDefault}>
                  Tipo
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="rounded-[10px] bg-[#F9FAFB]">
              {data.map((item, indice) => {
                return (
                  <tr
                    key={indice}
                    className="w-full border-b text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    <td className="whitespace-nowrap py-1 pl-6 pr-3">
                      {item.id}
                    </td>
                    <td className={styleTdDefault}>{item.name}</td>
                    <td className={styleTdDefault}>{item.email}</td>
                    <td className={styleTdDefault}>{item.userType}</td>
                    <td className="whitespace-nowrap py-1 px-3">
                      <div className="flex justify-end gap-3">
                        {/* <UpdateButtonTable id={item.id} slug="admin/users" /> */}
                        <DeleteButtonGeneric
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
