import Link from 'next/link';
import { Button, Card, Flex, Text, Title, Grid, Col } from '@tremor/react';
import { comment } from 'postcss';
import { displayUserAttendance2 } from '@/lib/actions';
import UserAllAttendance from '@/components/UserAllAttendance';
import AttendanceDescription from '@/components/AttendanceDescription';
import findAttendanceRecord from '@/lib/actions';
import type { AttendanceData } from '@/lib/types';
import { fetchUserFullname } from '@/lib/actions';

export default async function Page({ params }: { params: { attendanceId: string , userId: string} }) {
  let isAdmin : boolean = false;
  let sessionAndReportId: boolean = false
  const attendanceId = Number(params.attendanceId);
  const userId = Number(params.userId)
  const nameData = await fetchUserFullname();
  const fullname = nameData.firstname + " " + nameData.lastname
  if (userId === 3) {
    isAdmin = true;
  }

  const record = await findAttendanceRecord(userId, attendanceId)
  if (record) {
    const startTime = record.startTime.toString();
    const endTime = record.endTime?.toString();
    const startTimeFormatted = formatTime(startTime); // "09:00"
    const endTimeFormatted = formatTime(endTime); // "未定"
    const formattedDate = formatDateString(startTime);
    const attendanceProps : AttendanceData= {
        date: formattedDate,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
      };
      return (
        <>
        <AttendanceDescription username={fullname} data={attendanceProps} isAdmin={isAdmin}/>
        </>
      )
  } else {
    console.log("cant fetch")
    return <div>No attendance data available.</div>;
  }
}
function formatDateString(dateString: string) {
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    return `${year}年${month}月${day}日（${dayOfWeek}）`;
  }
  
  function formatTime(timeString?: string) {
    if (!timeString) {
      return "未定"; // endTimeがnullまたはundefinedの場合
    }
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }