import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from 'next-auth/providers/github';
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import { userAgentFromString } from "next/server";

export const authOptions: AuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "Credentials", //name, 設定しなくてもOK
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
        console.log(user + "at auth config")
        return {...user, id: user.id.toString()};
      },
    }),
  ],
  secret: "2Tia0rI+DjBVLod9z1dr6h0C4ha4TrxJbt2Zj1g4NEo=",
  pages: {
    signIn: '/login',  // カスタムのサインインページ
  },
  // 新しいSessionが追加できない
  // sessionが空になっている
  callbacks: {
    async session({ session }) {
        if (session) {
            console.log("we've got " + session.user?.email + " at session")
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