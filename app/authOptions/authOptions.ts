// app/authOptions/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";

const endpointLogin = "https://helpdesk-backend-muvo.onrender.com/api/users/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const response = await fetch(endpointLogin, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Error logging in: ${errorData}`);
          return null;
        }

        const data = await response.json();

        const user = {
          id: data.userId,
          name: data.name,
          email: email,
          role: data.userType,
          token: data.token,
          expirationDate: data.expirationDate,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const customUser = user as any;
        return {
          ...token,
          id: customUser.userId,
          name: customUser.name,
          email: customUser.email,
          role: customUser.role,
          token: customUser.token,
          expirationDate: customUser.expirationDate,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          id: token.sub,
          email: token.email,
          role: token.role,
          token: token.token,
          expirationDate: token.expirationDate,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};
