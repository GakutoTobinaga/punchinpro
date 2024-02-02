import Link from "next/link";
import { Button } from "@tremor/react";
import Clock from "./Clock";
import UserInButton from "./UserInButton";
import UserOutButton from "./UserOutButton";
import { AttendanceData } from "@/lib/types";
import { AttendanceCorrection } from "@prisma/client";
import { Attendance } from "@prisma/client";
import { isatty } from "tty";

export default function AttendanceDescription({username, data, isAdmin}:{username:string | undefined,data: AttendanceData, isAdmin:boolean}) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-screen max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl bg-blue-50">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
          <div>勤怠記録詳細</div>
            <h3 className="text-xl font-semibold">{data.date}</h3>
            <h3>{username}</h3>
        </div>
        <div className="pt-2">
          <div>
            <form className="flex flex-col space-y-4 bg-blue-50 px-4 py-8 sm:px-16">
            <div className="flex flex-col items-center justify-center">
            <div>出勤時間</div>
              <div className="text-5xl">{data.startTime}</div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </div>
            <div>退勤時間</div>
              <div className="text-5xl">{data.endTime}</div>
            </div>
            {isAdmin ? <Button>更新</Button> : <></>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
