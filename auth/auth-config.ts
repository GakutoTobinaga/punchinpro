import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password }
        : 
        { email: string; password: string } 
        = credentials as { email: string; password: string };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        console.log("email")
        const user : any = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        } 
        return {...user, id: user.id.toString()};
      },
    }),
  ],
  secret: "2Tia0rI+DjBVLod9z1dr6h0C4ha4TrxJbt2Zj1g4NEo=",
  pages: {
    signIn: '/login',  // カスタムのサインインページ
  },
  callbacks: {
    async session({ session }) {
        if (session) {
            console.log(session.user?.email)
        } else {
            console.log("we haven't got session callbacks.")
        }
        return session;
      }
  }
});
/*
Client

NEXTAUTH_URL

Environment variable NEXTAUTH_URL missing. 
Please set it in your .env file.

NOTE
On Vercel deployments, we will read the VERCEL_URL environment variable, 
so you won't need to define NEXTAUTH_URL.
*/