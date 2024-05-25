import { DeleteButtonTable, UpdateButtonTable } from "./buttons";

const styleThDefault = "px-3 py-5 font-medium";
const styleTdDefault = "whitespace-nowrap px-3 py-3";

interface Ticket {
  id: string;
  dt_creation: string;
  title: string;
  description: string;
  room: string;
  status: string;
}

export default function Table({
  tickets,
}: //   currentPage,
{
  tickets: Array<Ticket>;
  //   currentPage: number;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-xl  bg-[#f1f2f3] p-3 md:pt-0">
          {/* Aqui vai a versão mobile da tabela */}
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className={styleThDefault}>
                  Data Criação
                </th>
                <th scope="col" className={styleThDefault}>
                  Título
                </th>
                <th scope="col" className={styleThDefault}>
                  Descrição
                </th>
                <th scope="col" className={styleThDefault}>
                  Sala
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
              {tickets.map((item, indice) => {
                return (
                  <tr
                    key={indice}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {item.id}
                    </td>
                    <td className={styleTdDefault}>{item.dt_creation}</td>
                    <td className={styleTdDefault}>{item.title}</td>
                    <td className={styleTdDefault}>{item.description}</td>
                    <td className={styleTdDefault}>{item.room}</td>
                    <td className={styleTdDefault}>{item.status}</td>
                    <td className="whitespace-nowrap py-3 px-3">
                      <div className="flex justify-end gap-3">
                        <UpdateButtonTable id={item.id} slug="tickets" />
                        <DeleteButtonTable id={item.id} slug="tickets" />
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
