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

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNTc4MjM2Yy05ZTdiLTQ1OTAtYWVjNi1iN2FhYjBhZmFmNTgiLCJlbWFpbCI6InplY2F1cnVidUBnbWFpbC5jb20uYnIiLCJqdGkiOiIwNTg5MTQyOC1kNDIxLTQwMzMtODI0Yi01MWZkMGEzYmYyZDYiLCJuYmYiOjE3MTk3OTMzOTIsImlhdCI6IjA3LzAxLzIwMjQgMDA6MjM6MTIiLCJleHAiOjE3MTk3OTY5OTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJBdWRpZW5jZSJ9.oejLJfWGGYW_Ug1IeQyeyVpJAP7xjZhcqlN24iHRaJdB9TInPIfOylGQO7EZbw1PHcb8Qi-yWumraRpF0wSVNg"

export async function deleteGeneric(infoUrl: InfoUrl) {
  const getDataUserLogged = await getDataSession();
  const token = getDataUserLogged?.token;

  let newUrlDelete = `${urlBaseApi}/${infoUrl.slug}/${infoUrl.id}`;

  const response = await fetch(newUrlDelete, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const statusError = response.status;
    console.error(statusError);
    return;
  }
  const urlBaseRedirect = "/dashboard";
  let newUrlRedirect = `${urlBaseRedirect}/${infoUrl.redirect}}`;
  revalidatePath(newUrlRedirect);
  redirect(newUrlRedirect);
}

export async function getItemByIdGeneric(id: string, slug: string) {
  const response = await fetch(`${urlBaseApi}/tickets/${id}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
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
