"use server";

import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { InfoUrl, urlBaseApi } from "./definitions";

export async function deleteGeneric(infoUrl: InfoUrl) {
  let newUrlDelete = `${urlBaseApi}/${infoUrl.slug}/${infoUrl.id}`;
  const urlBaseRedirect = "/dashboard/";
  let newUrlRedirect = `${urlBaseRedirect}/${infoUrl.slug}}`;

  const response = await fetch(newUrlDelete, {
    method: "DELETE",
  });

  if (response.ok) {
    revalidatePath(newUrlRedirect);
    redirect(newUrlRedirect);
  } else {
    const errorData = await response.json();
    console.error(`Erro ao deletar ${infoUrl.slug}: ${errorData.error}`);
  }
}

export async function getItemByIdGeneric(id: string, slug: string) {
  const newUrl = `${urlBaseApi}/${slug}/${id}`;
  const data = await fetch(newUrl, {
    cache: "no-store",
  });
  if (!data.ok) throw new Error(`Failed to fetch data! ${slug}`);
  return data.json();
}
