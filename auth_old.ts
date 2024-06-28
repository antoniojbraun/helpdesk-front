// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config_old";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";

// type User = {
//   email: string;
//   password: string;
//   role: string;
//   token: string;
// };

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const user: User = {
//           email: "kingofthesea@gmail.com",
//           password: "123456",
//           role: "admin",
//           token: "fsadfasdfsadfasdfads",
//         };

//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(3) })
//           .safeParse(credentials);
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const isValidEmail = email === user.email;
//           const isValidPassword = password === user.password;

//           if (!isValidEmail || !isValidPassword) return null;

//           return user;
//         }
//         console.log("Algo de errado não está certo");
//         return null;
//       },
//     }),
//   ],
// });
