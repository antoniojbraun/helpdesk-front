// route.ts
import NextAuth from "next-auth";
import { authOptions } from "../../../authOptions"; // Adjust the import path as needed

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
