"use client";

import { useEffect } from "react";
import { ViewButtonTable } from "../buttons";
import Status from "./status";
import { TicketByUser } from "@/app/lib/definitions";
import { poppins500 } from "../../fonts";
const styleThDefault = "px-3 py-5 font-medium";
const styleTdDefault = "whitespace-nowrap px-3 py-1";

export default function TableTickets({
  data,
  url,
}: {
  data: TicketByUser[];
  url: string;
}) {
  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("room")) localStorage.removeItem("room");
    }
  });
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-xl bg-[#f1f2f3] p-3 md:pt-0">
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
                      <div>
                        <p>{item.title}</p>
                        <p className={`${poppins500.className} text-sm`}>
                          #{item.number}
                        </p>
                      </div>
                      <div>
                        <Status>{item.status}</Status>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 whitespace-pre-wrap">
                    <div className="flex flex-col ">
                      <p>Sala {item.room.name}</p>
                      <p>Criado em {item.createdAt}</p>
                    </div>
                    <div className="flex justify-end gap-2 ml-[3px]">
                      {/* <UpdateButtonTable id={item.id} slug="tickets" />
                      <DeleteButtonTable id={item.id} slug="tickets" /> */}
                      <ViewButtonTable id={item.id} slug="admin/tickets" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Aqui vai a versão desktop */}
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className={styleThDefault}>
                  Título
                </th>
                {/* <th scope="col" className={styleThDefault}>
                    Descrição
                  </th> */}
                <th scope="col" className={styleThDefault}>
                  Sala
                </th>
                <th scope="col" className={styleThDefault}>
                  Data Criação
                </th>
                <th scope="col" className={styleThDefault}>
                  Status
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
                      {item.number}
                    </td>
                    <td className={styleTdDefault}>{item.title}</td>
                    {/* <td className={styleTdDefault}>{item.description}</td> */}
                    <td className={styleTdDefault}>{item.room.name}</td>
                    <td className={styleTdDefault}>{item.createdAt}</td>
                    <td className={styleTdDefault}>
                      <Status>{item.status}</Status>
                    </td>
                    <td className="whitespace-nowrap py-1 px-3">
                      <div className="flex justify-end gap-3">
                        <ViewButtonTable id={item.id} slug={`${url}/tickets`} />
                        {/* <UpdateButtonTable id={item.id} slug="tickets" /> */}
                        {/* <DeleteButtonTable id={item.id} slug="tickets"  /> */}
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
