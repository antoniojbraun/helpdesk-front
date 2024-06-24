"use server";

import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { InfoUrl, urlBaseApi } from "./definitions";

export async function deleteGeneric(infoUrl: InfoUrl) {
  const urlBaseDelete = "http://localhost:3100";
  let newUrlDelete = `${urlBaseDelete}/${infoUrl.slug}/${infoUrl.id}`;
  const urlBaseRedirect = "/dashboard/";
  let newUrlRedirect = `${urlBaseRedirect}/${infoUrl.slug}}`;

  try {
    const response = await fetch(newUrlDelete, {
      method: "DELETE",
    });
    if (response.ok) {
      revalidatePath(newUrlRedirect);
      redirect(newUrlRedirect);
    }
  } catch (err) {
    console.log(`Erro ao deletar item: ${err}`);
  }
}

export async function getItemByIdGeneric(id: string, slug: string) {
  const newUrl = `${urlBaseApi}/${slug}/${id}`;
  console.log(newUrl);
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
