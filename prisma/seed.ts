// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ここにシードデータを挿入するロジックを実装
  await prisma.attendance.createMany({
    data: [
      {
        userId: 13,
        date: new Date('2024-02-01'),
        startTime: new Date('2024-02-01T09:17:00'),
        endTime: new Date('2024-02-01T16:34:00'),
        energyLevel: 1,
      },
      {
        userId: 13,
        date: new Date('2024-02-02'),
        startTime: new Date('2024-02-02T10:22:00'),
        endTime: new Date('2024-02-02T17:40:00'),
        energyLevel: 4,
      },
      // 他の日付のデータ...
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
