// app/types.ts

import { Session } from "next-auth";

// Defina o tipo User
export interface User {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: number; // Adiciona a propriedade role
  token?: string; // Adiciona a propriedade token
  expirationDate?: string; // Adiciona a propriedade expirationDate
}

// Atualiza o tipo Session para incluir a propriedade user
export interface CustomSession extends Session {
  user?: User;
}
