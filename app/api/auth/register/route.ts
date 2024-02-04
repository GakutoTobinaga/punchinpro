import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Request) {
  const { email, firstname, lastname, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    console.log('EMAIL IS ALREADY TOKEN');
    return NextResponse.json(
      { error: 'ユーザーは登録されています' },
      { status: 400 }
    );
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
