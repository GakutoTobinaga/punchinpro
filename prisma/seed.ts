import { PrismaClient } from '@prisma/client';
import { addDays, setHours, setMinutes, setSeconds } from 'date-fns';

const prisma = new PrismaClient();

// ランダムな時刻を生成する関数
function randomTime(startHour: number, endHour: number, date: Date): Date {
  const hour =
    Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return setSeconds(setMinutes(setHours(date, hour), minute), 0);
}

async function main() {
  for (let userId = 5; userId <= 14; userId++) {
    for (let day = 0; day < 31; day++) {
      const date = addDays(new Date(2024, 0, 1), day); // 2024年1月1日からスタート
      const startTime = randomTime(9, 10, date); // 出勤時刻: 9時〜10時の間
      const endTime = randomTime(15, 18, date); // 退勤時刻: 15時〜18時の間

      // Attendanceレコードの挿入
      await prisma.attendance.create({
        data: {
          userId,
          date,
          startTime,
          endTime,
          breaks: 0, // 休憩時間（必要に応じて調整）
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
