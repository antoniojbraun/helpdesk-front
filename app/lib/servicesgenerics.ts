"use server";

import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { InfoUrl, urlBaseApi } from "./definitions";
import {
  convertToKeyOfT,
  ListItemsLimitedPerPage,
  OrderingByItem,
  VerifyQueryForSearch,
  getDataSession,
} from "./utils";

export async function deleteGeneric(infoUrl: InfoUrl) {
  // const getDataUserLogged = await getDataSession();
  // const token = getDataUserLogged?.token;

  // let newUrlDelete = `${urlBaseApi}/${infoUrl.slug}/${infoUrl.id}`;

  // const response = await fetch(newUrlDelete, {
  //   method: "DELETE",
  //   headers: { Authorization: `Bearer ${token}` },
  // });

  // if (!response.ok) {
  //   const statusError = response.status;
  //   return {
  //     status: statusError,
  //   };
  // }
  const urlBaseRedirect = "/dashboard";
  let newUrlRedirect = `${urlBaseRedirect}/${infoUrl.redirect}}`;
  
  revalidatePath(newUrlRedirect);
  redirect(newUrlRedirect);
}

export async function getItemByIdGeneric(id: string, slug: string) {
  const newUrl = `http://localhost:3100/${slug}/${id}`;
  
  const response = await fetch(newUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = response.json();
    console.error(
      `Problema ao buscar dados de '${slug}' com erro: ${errorData} `
    );
  }
  return response.json();
}

const ITEMS_PER_PAGE = 10;

export async function HowManyPagesGeneric<T>(
  getAllItems: () => Promise<T[]>,
  query: string
): Promise<number> {
  let items: Array<T> = await getAllItems();
  let filteredItems: T[];

  if (query && query.trim() != "") {
    filteredItems = items.filter((item: T) =>
      VerifyQueryForSearch(item, query)
    );
  } else {
    filteredItems = [...items];
  }
  const totalPages = Math.ceil(Number(filteredItems.length) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchFilteredItemsGeneric<T>(
  query: string,
  order: string,
  currentPage: number,
  getAllItems: () => Promise<T[]>,
  type: T
) {
  let items: T[] = await getAllItems();
  let filteredItems: T[];
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Aqui caso houver uma query, fazemos o filtro dos tickets por ela.
  if (query != "") {
    filteredItems = items?.filter((item: T) =>
      VerifyQueryForSearch(item, query)
    );
  } else {
    filteredItems = [...items];
  }
  if (order != "") {
    let newOrder = convertToKeyOfT(order, type);
    
    if (newOrder) filteredItems = OrderingByItem(filteredItems, newOrder);
  }
  // Aqui vamos filtrar agora pela paginação.
  filteredItems = filteredItems.filter((item, key) =>
    ListItemsLimitedPerPage(key, offset, ITEMS_PER_PAGE)
  );

  return filteredItems;
}
