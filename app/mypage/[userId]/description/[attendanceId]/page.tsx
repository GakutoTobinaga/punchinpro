import AttendanceDescription from '@/components/AttendanceDescription';
import { getAttendanceRecordById } from '@/lib/actions';
import type { AttendanceData } from '@/lib/types';
import { getUserEmailFromSession } from '@/lib/actions';
import { getUserNamesById } from '@/lib/actions';

export default async function Page({
  params,
}: {
  params: { attendanceId: string; userId: string };
}) {
  let isAdmin: boolean = false;
  const attendanceId = Number(params.attendanceId);
  const userId = Number(params.userId);
  const ids = { userId, attendanceId };
  const nameData = await getUserNamesById(userId);
  const fullname = nameData?.firstName + ' ' + nameData?.lastName;
  const email = await getUserEmailFromSession();
  if (typeof email === 'string' && email === 'admin@mail.com') {
    isAdmin = true;
  }
  const record = await getAttendanceRecordById(userId, attendanceId);
  if (record) {
    const startTime = record.startTime.toString();
    const endTime = record.endTime?.toString();
    const startTimeFormatted = formatTime(startTime);
    const endTimeFormatted = formatTime(endTime);
    const formattedDate = formatDateString(startTime);
    const attendanceProps: AttendanceData = {
      date: formattedDate,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
    };
    return (
      <>
        <AttendanceDescription
          username={fullname}
          data={attendanceProps}
          isAdmin={isAdmin}
          ids={ids}
        />
      </>
    );
  } else {
    console.log('cant fetch');
    return (
      <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
        No attendance data available.
      </div>
    );
  }
}
function formatDateString(dateString: string) {
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${year}年${month}月${day}日（${dayOfWeek}）`;
}

function formatTime(timeString?: string) {
  if (!timeString) {
    return '未定';
  }
  const date = new Date(timeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
