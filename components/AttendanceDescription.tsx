"use client"
import { Button, TextInput } from "@tremor/react";
import { AttendanceData } from "@/lib/types";
import { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { updateAttendanceRecord } from "@/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AttendanceDescription({username, data, isAdmin, ids}
  :
  {username:string | undefined,data: AttendanceData, isAdmin:boolean, ids : {userId: number, attendanceId: number}}) {
    const [isEditing, setIsEditing] = useState(false);
    const [startTime, setStartTime] = useState(data.startTime);
    const [endTime, setEndTime] = useState(data.endTime || ""); // endTimeがundefinedの可能性がある場合、初期値を空文字列に
    const router = useRouter();
    const handleTimeAdjustmentClick = () => {
      setIsEditing(!isEditing);
    };
  
    const handleConfirmClick = async () => {
      await updateAttendanceRecord(ids.userId, ids.attendanceId, startTime, endTime);
      setIsEditing(false); // 勤怠データの更新後に編集モードを終了
      
      router.push(`/mypage/${ids.userId}`)
      toast.success("データを更新しました。")
    };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-screen max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl bg-blue-50">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
        <Button size="xs" onClick={handleTimeAdjustmentClick}>修正</Button>
          <div>勤怠記録詳細</div>
          <h3 className="text-xl font-semibold">{data.date}</h3>
          <h3>{username}</h3>
        </div>
        <div className="ここからフォーム">
          {!isEditing ?           <form className="flex flex-col space-y-4 bg-blue-50 px-4 py-8 sm:px-16">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl">出勤時間</div>
              
                <div className="text-4xl">{data.startTime}</div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div className="text-4xl">退勤時間</div>
              
                <div className="text-4xl">{data.endTime}</div>
            </div>
          </form> : <form className="flex flex-col space-y-4 bg-blue-50 px-4 py-8 sm:px-16">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl">出勤時間を修正</div>
              
                <div className="text-4xl"><input type="time" defaultValue={data.startTime} onChange={(e) => setStartTime(e.target.value)}/></div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div className="text-4xl">退勤時間を修正</div>
                <div className="text-4xl"><input type="time" defaultValue={data.endTime} onChange={(e) => setEndTime(e.target.value)}/></div>
            </div>
            <Button size="xs" onClick={handleConfirmClick}>確定</Button>
          </form>}
        </div>
      </div>
    </div>
  );
}
