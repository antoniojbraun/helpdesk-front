// import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";
// import CredentialProvider from "next-auth/providers/credentials";
// import { redirect } from "next/navigation";

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = {
//           id: "1",
//           email: "user@email.com",
//           password: "123",
//           name: "User Hardcode",
//           role: "support",
//         };
//         const isValidEmail = user.email === credentials?.email;
//         const isValidPassword = user.password === credentials?.password;
//         if (!isValidEmail || !isValidPassword) {
//           return null;
//         }   
        
//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: ({ token, user }) => {
//       const cumstomUser = user as unknown as any;
//       if (user) {
//         return {
//           ...token,
//           role: cumstomUser.role,
//         };
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       return {
//         ...session,
//         user: {
//           name: token.name,
//           email: token.email,
//           role: token.role,
//         },
//       };
//     },
//   },
//   //   pages: {
//   //     signIn: "/auth/login",
//   //   },
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
