import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

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
        const user = {
          id: "1",
          email: "braun1986@hotmail.com",
          password: "123",
          role: "support",
        };
        try {
          const response = await fetch(endpointLogin, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            // Se a resposta não for OK, lançamos um erro
            throw new Error(`Erro: ${response.body?.getReader}`);
          }
          console.log(response.json());
        } catch (error) {
          console.error("Erro na autenticação: ", error);
          throw error;
        }

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
          role: cumstomUser.role,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
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
