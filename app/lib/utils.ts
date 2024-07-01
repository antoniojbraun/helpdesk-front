import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Chat } from "./definitions";

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last pages.

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is amont the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function VerifyQueryForSearch<T>(item: T, query: string) {
  let hasInList = 0;
  for (let property in item) {
    if (isKeyOfT(property, item)) {
      let itemProperty = item[property as keyof T];

      // verifica se a propriedade é uma string ou pode ser convertida para
      if (itemProperty !== null && itemProperty !== undefined) {
        let itemPropertyString = itemProperty.toString().toLowerCase();
        query = query.toLowerCase();
        if (itemPropertyString.includes(query)) hasInList++;
      }
    }
  }
  return hasInList > 0;
}

export function ListItemsLimitedPerPage(
  key: number,
  offset: number,
  ITEMS_PER_PAGE: number
) {
  return key >= offset && key <= offset + (ITEMS_PER_PAGE - 1);
}

export function OrderingByItem<T>(array: T[], item: keyof T): T[] {
  array.sort(function (a, b) {
    if (a[item] < b[item]) {
      return -1;
    }
    if (a[item] > b[item]) {
      return 1;
    }
    return 0;
  });
  return array;
}

function isKeyOfT<T>(key: string, type: T): key is keyof T {
  return key in type;
}
export function convertToKeyOfT<T>(key: string, type: T): keyof T | undefined {
  if (isKeyOfT(key, type)) {
    return key;
  } else {
    return undefined;
  }
}

export async function getDataSession() {
  const session = await getServerSession(authOptions);
  if (session) {
    const dataUserLogged = {
      name: session.user?.name,
      id: session.user?.id,
      email: session.user?.email,
      role: session.user?.role,
      token: session.user?.token,
      expirationDate: session.user?.expirationDate,
    };
    return dataUserLogged;
  }
}

export const chats: Chat = {
  id: "1",
  chatdata: [
    {
      id: 1,
      userType: "support",
      author: "Smeagle",
      message:
        "Boa noite Antonio. Já fizemos a troca do seu monitor! Por favor, teste e veja se está tudo certo.",
      day_sent: "2024-06-12",
      hour_sent: "14:01",
    },
    {
      id: 2,
      userType: "user",
      author: "Bilbo Bolseiro",
      message:
        "Ok, assim que chegar na sala eu testo e dou um retorno pra vocês aqui.",
      day_sent: "2024-06-12",
      hour_sent: "18:45",
    },
    {
      id: 3,
      userType: "user",
      author: "Bilbo Bolseiro",
      message: "Olha só, parece que está tudo ok. Muito obrigado pela rapidez.",
      day_sent: "2024-06-12",
      hour_sent: "19:00",
    },
    {
      id: 4,
      userType: "support",
      author: "Smeagle",
      message: "Nós que agradecemos. Uma ótima aula.",
      day_sent: "2024-06-12",
      hour_sent: "19:15",
    },
  ],
};
