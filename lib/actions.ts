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

export const fetchUserId = async (userEmail:string) => {
    const userId = await prisma.user.findUnique({
        where: { email: userEmail},
        select: {
          id: true,
        }
    });
    return userId ? userId.id : null;
}

export const recordAttendance = async (userId:number) : Promise<boolean> => {
  // 出勤情報をデータベースに記録する処理を実装
  try {
    // 出勤情報の記録
    await prisma.attendance.create({
      data: {
        userId: userId,
        date: new Date(),
        startTime: new Date(), // 現在の日時を startTime に設定する例
      }
    });

    // 出勤情報の記録が成功した場合の処理
    console.log(`User ${userId} の出勤情報を記録しました。`);
    return true; // 成功時に true を返すか、必要に応じて他の値を返すことができます
  } catch (error) {
    // エラーハンドリング
    console.error(`出勤情報の記録中にエラーが発生しました: ${error}`);
    return false; // エラー時に false を返すか、必要に応じて他の値を返すことができます
  }
}
export const displayUserAttendance = async () => {
    try {
      const userEmail = await fetchUserEmail();
      if (userEmail) {
        const userId = await fetchUserId(userEmail);
        console.log('UserID:', userId); // UserIDの確認
        const userAllAttendance = await prisma.attendance.findMany({
          where: { userId: Number(userId) }, // 必要に応じて型変換
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
          }
        });
        return userAllAttendance;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error in displayUserAttendance:', error);
      return undefined;
    }
  };
  