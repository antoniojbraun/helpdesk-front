"use client";
import { signOut } from "next-auth/react";

export async function signOutButton() {
  await signOut();
}

export const SignOutButton = () => {
  return <button onClick={() => signOutButton()}>Sair</button>;
};
