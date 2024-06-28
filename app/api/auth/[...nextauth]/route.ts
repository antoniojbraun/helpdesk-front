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

        const response = await fetch(endpointLogin, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const erroData = response.json();
          console.error(`Erro ao fazer login: ${erroData}`);
        }
        console.log(response.json());

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
