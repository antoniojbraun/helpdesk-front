"use server";

import { revalidatePath } from "@/node_modules/next/cache";
import { redirect } from "@/node_modules/next/navigation";
import { InfoUrl } from "./definitions";

export async function deleteGeneric(infoUrl: InfoUrl) {
  const urlBaseDelete = "http://localhost:3100";
  let newUrlDelete = `${urlBaseDelete}/${infoUrl.slug}/${infoUrl.id}`;
  let urlBaseRedirect = `/dashboard/${infoUrl.slug}`;
  urlBaseRedirect = urlBaseRedirect.toString();
  console.log(newUrlDelete);
  console.log(urlBaseRedirect);

  try {
    const response = await fetch(newUrlDelete, {
      method: "DELETE",
    });
    if (response.ok) {
      revalidatePath(urlBaseRedirect);
      redirect(urlBaseRedirect);
    }
  } catch (err) {
    console.log(`Erro ao deletar item: ${err}`);
  }
}
