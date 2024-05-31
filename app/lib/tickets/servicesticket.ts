"use server";

import { Ticket } from "../definitions";

export async function getAllTickets(): Promise<Ticket[]> {
  const data = await fetch("http://localhost:3100/tickets", {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}
