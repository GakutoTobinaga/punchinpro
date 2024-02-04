import Link from "next/link";
import Clock from "./Clock";
import UserInButton from "./UserInButton";
import UserOutButton from "./UserOutButton";

export default function UserDashboard({username}:{username:string | undefined}) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-screen max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl bg-blue-50">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
            <Link href="/mypage">
                {username}
            </Link>
            <h3 className="text-xl font-semibold">ATTENDANCE</h3>
            <p className="text-sm text-gray-500">
                勤怠を記録しましょう。
            </p>
            </div>
        <Clock/>
        <div className="w-full">
            <div className="flex justify-between h-90 pb-10 items-center mx-10">
                <UserInButton/>
                <UserOutButton/>
            </div>
        </div>
      </div>
    </div>
  );
}
