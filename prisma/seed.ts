import { PrismaClient } from '@prisma/client';
import { addDays, setHours, setMinutes, setSeconds } from 'date-fns';

const prisma = new PrismaClient();

// ランダムな時刻を生成する関数
function randomTime(startHour: number, endHour: number, date: Date): Date {
  const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return setSeconds(setMinutes(setHours(date, hour), minute), 0);
}

// ランダムなエネルギーレベルを生成する関数
function randomEnergyLevel(): number {
  return Math.floor(Math.random() * 5) + 1; // 1から5までの整数
}

async function main() {
  for (let userId = 2; userId <= 11; userId++) {
    for (let day = 0; day < 31; day++) {
      const date = addDays(new Date(2024, 0, 1), day); // 2024年1月1日からスタート
      const startTime = randomTime(9, 10, date); // 出勤時刻: 9時〜10時の間
      const endTime = randomTime(15, 18, date); // 退勤時刻: 15時〜18時の間
      const energyLevel = randomEnergyLevel(); // エネルギーレベル: 1から5のランダム

      // Attendanceレコードの挿入、breaksフィールドは除外して、energyLevelを追加
      await prisma.attendance.create({
        data: {
          userId,
          date,
          startTime,
          endTime,
          energyLevel, // 新しいフィールド
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
