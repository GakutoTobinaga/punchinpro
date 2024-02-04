'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-config';
// prisma
import prisma from './prisma';
import { Session } from 'next-auth';
import { parse, format } from 'date-fns';

export const getUserEmailFromSession = async () => {
  const session: Session | null | undefined =
    await getServerSession(authOptions);
  if (session === undefined || session === null) {
    return undefined;
  } else {
    return session.user?.email;
  }
};

export const getUserFullNameByEmail = async (): Promise<{
  firstname: string;
  lastname: string;
}> => {
  const userEmail = await getUserEmailFromSession();

  if (!userEmail) {
    return { firstname: '', lastname: '' };
  }

  const userInfo = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { firstname: true, lastname: true },
  });

  if (!userInfo) {
    return { firstname: '', lastname: '' };
  }

  return userInfo;
};

export const getUserIdByEmail = async (
  userEmail: string
): Promise<number | null> => {
  const userId = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      id: true,
    },
  });
  if (userId) {
    return userId?.id;
  }
  return null;
};

export const getUserNamesById = async (
  userId: number
): Promise<{ firstName: string; lastName: string } | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstname: true,
      lastname: true,
    },
  });

  if (user) {
    return {
      firstName: user.firstname,
      lastName: user.lastname,
    };
  } else {
    return null;
  }
};

export const createTodayAttendanceRecord = async (userId: number): Promise<boolean> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await prisma.attendance.findFirst({
      where: {
        userId: userId,
        date: today,
      },
    });

    if (existingRecord) {
      return false;
    }

    await prisma.attendance.create({
      data: {
        userId: userId,
        date: today,
        startTime: new Date(),
      },
    });

    console.log(`User ${userId} の出勤情報を記録しました。`);
    return true;
  } catch (error) {
    console.error(`出勤情報の記録中にエラーが発生しました: ${error}`);
    return false;
  }
};

export const updateAttendanceWithEndTime = async (userId: number): Promise<boolean> => {
  try {
    const latestAttendance = await prisma.attendance.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        startTime: 'desc',
      },
      take: 1,
    });

    if (latestAttendance.length === 0) {
      throw new Error(`User ${userId} に関する出勤記録が見つかりません。`);
    }

    const latestRecord = latestAttendance[0];

    if (latestRecord.endTime) {
      console.log(`User ${userId} は既に退勤記録があります。`);
      return false;
    }

    await prisma.attendance.update({
      where: {
        id: latestRecord.id,
      },
      data: {
        endTime: new Date(),
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getUserAttendanceRecordsByEmail = async () => {
  try {
    const userEmail = await getUserEmailFromSession();
    if (userEmail) {
      const userId = await getUserIdByEmail(userEmail);
      const userAllAttendance = await prisma.attendance.findMany({
        where: { userId: Number(userId) },
        select: {
          date: true,
          startTime: true,
          endTime: true,
        },
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
export const getUserAttendanceRecordsById = async (userId: number) => {
  try {
    const userAllAttendance = await prisma.attendance.findMany({
      where: { userId: Number(userId) },
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        userId: true,
        date: true,
        startTime: true,
        endTime: true,
      },
    });
    return userAllAttendance;
  } catch (error) {
    console.error('Error in displayUserAttendance:', error);
    return undefined;
  }
};

export const updateUserEmailById = async () => {
  const updateAttendance = await prisma.user.update({
    where: {
      email: 'viola@prisma.io',
    },
    data: {
      email: 'Viola@gmail.com',
    },
  });
  if (updateAttendance) {
    return true;
  } else {
    return false;
  }
};

export const getAllAttendanceRecords = async () => {
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

export const getAllUsersWithNames = async () => {
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

export async function getAttendanceRecordById(
  userId: number,
  attendanceId: number
) {
  try {
    const attendanceRecord = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
        userId: userId,
      },
      select: {
        date: true,
        startTime: true,
        endTime: true,
      },
    });

    return attendanceRecord;
  } catch (error) {
    console.error('Error fetching attendance record:', error);
    throw error;
  }
}

export async function updateAttendanceTimesById(
  userId: number,
  attendanceId: number,
  newStartTimeStr: string,
  newEndTimeStr: string
) {
  try {
    const existingRecord = await prisma.attendance.findUnique({
      where: {
        id: attendanceId,
        userId: userId,
      },
    });

    if (!existingRecord) {
      throw new Error('Attendance record not found');
    }

    const existingDate = existingRecord.date;

    const newStartTime = parse(
      `${format(existingDate, 'yyyy-MM-dd')} ${newStartTimeStr}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );
    const newEndTime = parse(
      `${format(existingDate, 'yyyy-MM-dd')} ${newEndTimeStr}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );

    const updatedAttendanceRecord = await prisma.attendance.update({
      where: {
        id: attendanceId,
        userId: userId,
      },
      data: {
        startTime: newStartTime,
        endTime: newEndTime,
      },
    });

    console.log('Updated attendance record:', updatedAttendanceRecord);
    return updatedAttendanceRecord;
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw error;
  }
}
