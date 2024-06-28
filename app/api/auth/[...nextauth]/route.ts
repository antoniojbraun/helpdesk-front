import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import z from "zod";
const endpointLogin =
  "https://helpdesk-backend-muvo.onrender.com/api/users/login";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const dataForm = {
          email: "braun1986@hotmail.com",
          password: "Mudar123@",
        };

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const response = await fetch(endpointLogin, {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });

        const data = await response.json();

        if (!response.ok) {
          const erroData = response.json();
          console.error(`Erro ao fazer login: ${erroData}`);
          return null;
        }
        const user = {
          id: data.userId,
          name: data.name,
          email: dataForm.email,
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
      const cumstomUser = user as unknown as any;
      if (user) {
        return {
          ...token,
          id: cumstomUser.userId,
          name: cumstomUser.name,
          email: cumstomUser.email,
          role: cumstomUser.role,
          token: cumstomUser.token,
          expirationDate: cumstomUser.expirationDate,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.userId,
          name: token.name,
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
