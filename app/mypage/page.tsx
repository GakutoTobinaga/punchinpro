import { fetchUsername } from "@/lib/actions";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";

export default async function Mypage() {
    const session : Session | null | undefined = await getServerSession(authOptions);
    console.log(session)
    return (
      <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      </main>
      </div>
    );
  }
  