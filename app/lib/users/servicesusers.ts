"use server";

import { User } from "../definitions";

export async function getAllUsers(): Promise<User[]> {
  const data = await fetch("http://localhost:3100/users", {
    cache: "no-store",
  });
  if (!data.ok) throw new Error("Failed to fetch data!");
  return data.json();
}
