import type { Metadata } from "next";
import { poppinsRegular } from "./ui/fonts";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "Helpdesk SENAI",
  description:
    "Sistema de criação e gerenciamento de Chamados desenvolvido para UniSENAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppinsRegular.className}>{children}</body>
    </html>
  );
}
