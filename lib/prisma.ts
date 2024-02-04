import { PrismaClient } from "@prisma/client";

declare global {
  // TypeScriptでのグローバル変数の型宣言
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // 本番環境では新しいPrismaClientインスタンスを毎回生成
  prisma = new PrismaClient();
} else {
  // 開発環境では、グローバル変数にPrismaClientインスタンスをキャッシュして再利用
  // これは、ホットリロード時に多数の接続が生成されるのを防ぐため
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
