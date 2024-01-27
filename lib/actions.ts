"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-config";
// prisma
import prisma from "./prisma";
import { Session } from 'next-auth';
import { use } from "react";

// UserEmailを取得する関数.
export const fetchUserEmail = async () => {
    const session: Session | null | undefined = await getServerSession(authOptions);
    // セッションが存在しない場合はundefinedを返す
    if (session === undefined || session === null) {
      return undefined;
    } else {
    // セッションからユーザーemailを取得して返す
      return session.user?.email
    }
  };

export const fetchUserFullname = async () => {
    const userEmail = await fetchUserEmail()
    if (userEmail) {
        const userFullname = await prisma.user.findUnique({
            where: { email: userEmail},
            select: {
              firstname: true,
              lastname: true,
            }
    });
        return userFullname
    } else {
        return undefined;
    }
}