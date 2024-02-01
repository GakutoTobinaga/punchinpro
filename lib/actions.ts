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

  export const fetchUserFullname = async (): Promise<{ firstname: string; lastname: string } | null> => {
    const userEmail = await fetchUserEmail();
    if (!userEmail) return null;
  
    const userInfo = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { firstname: true, lastname: true },
    });
  
    return userInfo;
  };

export const fetchUserId = async (userEmail:string): Promise<number | null> => {
    const userId = await prisma.user.findUnique({
        where: { email: userEmail},
        select: {
          id: true,
        }
    });
    if (userId){
      return userId?.id
    }
    return null;
}

export const recordAttendance = async (userId: number): Promise<boolean> => {
  try {
    // 今日の日付を取得
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時刻を 00:00:00 に設定

    // 今日の出勤記録がすでに存在するかチェック
    const existingRecord = await prisma.attendance.findFirst({
      where: {
        userId: userId,
        date: today,
      },
    });

    // 既に記録がある場合は新しい記録を作成しない
    if (existingRecord) {
      console.log(`User ${userId} は今日すでに出勤記録があります。`);
      return false; // 既に記録があるため、false を返す
    }

    // 出勤情報の記録
    await prisma.attendance.create({
      data: {
        userId: userId,
        date: today,
        startTime: new Date(), // 現在の日時を startTime に設定
      },
    });

    console.log(`User ${userId} の出勤情報を記録しました。`);
    return true;
  } catch (error) {
    console.error(`出勤情報の記録中にエラーが発生しました: ${error}`);
    return false;
  }
};

// outの処理
export const recordAttendanceOut = async (userId: number): Promise<boolean> => {
  try {
    // 特定のユーザーの最新の出勤記録を検索
    const latestAttendance = await prisma.attendance.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        startTime: 'desc', // startTime を基準に降順でソート
      },
      take: 1, // 最初の1件だけを取得
    });

    if (latestAttendance.length === 0) {
      throw new Error(`User ${userId} に関する出勤記録が見つかりません。`);
    }

    const latestRecord = latestAttendance[0];
    
    // すでに退勤時刻が記録されているかチェック
    if (latestRecord.endTime) {
      console.log(`User ${userId} は既に退勤記録があります。`);
      return false; // 既に退勤記録があるため、false を返す
    }

    // 最新の出勤記録を更新
    await prisma.attendance.update({
      where: {
        id: latestRecord.id, // 最新の記録のIDを使用
      },
      data: {
        endTime: new Date(), // 現在の日時を endTime に設定
      },
    });

    console.log(`User ${userId} の退勤情報を記録しました。`);
    return true;
  } catch (error) {
    console.error(`退勤情報の記録中にエラーが発生しました: ${error}`);
    return false;
  }
};


export const displayUserAttendance = async () => {
    try {
      const userEmail = await fetchUserEmail();
      if (userEmail) {
        const userId = await fetchUserId(userEmail);
        console.log('UserID:', userId); // UserIDの確認
        const userAllAttendance = await prisma.attendance.findMany({
          where: { userId: Number(userId) }, // 必要に応じて型変換
          select: {
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
  export const displayUserAttendance2 = async (userId : number) => {
    try {
        const userAllAttendance = await prisma.attendance.findMany({
          where: { userId: Number(userId) }, // 必要に応じて型変換
          select: {
            date: true,
            startTime: true,
            endTime: true,
          }
        });
        return userAllAttendance;
    } catch (error) {
      console.error('Error in displayUserAttendance:', error);
      return undefined;
    }
  };


export const updateUserAttendance = async () => {
  const updateAttendance = await prisma.user.update({
    where: {
      email: 'viola@prisma.io',
    },
    data: {
      email: 'Viola@gmail.com',
    },
  })
  if (updateAttendance) {
    return true
  } else {
  return false
}
}

export const fetchAllUser = async () => {
  try {
    const allUser = await prisma.attendance.findMany({
      orderBy: {
        userId: 'desc',
      },
    });
    if (allUser.length === 0) {
      throw new Error(`Userに関する出勤記録が見つかりません。`);
    }
    return allUser;
  } catch (error) {
    console.error(`error has occured.`);
  }
};

export const fetchAllUser2 = async () => {
  try {
    const allUser = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    if (allUser.length === 0) {
      throw new Error(`ユーザーが見つかりません。`);
    }
    return allUser;
  } catch (error) {
    console.error(`error has occured.`);
    throw error;
  }
};
