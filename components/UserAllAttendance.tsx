'use client';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHead,
  TableRow,
  Title,
} from '@tremor/react';
import { Button } from '@tremor/react';
import Link from 'next/link';
import { deleteAttendanceById } from '@/lib/actions';
import toast from 'react-hot-toast';

type AttendanceData = {
  id: number;
  userId: number;
  date: string;
  startTime: string;
  endTime?: string;
  energyLevel: number | null;
};

type AttendanceTableProps = {
  data: AttendanceData[];
  adminSessionToken: boolean;
  fullname: string;
};

const formatDateString = (dateString: string) => {
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${year}年${month}月${day}日（${dayOfWeek}）`;
};

const AttendanceTable = ({
  data,
  adminSessionToken,
  fullname,
}: AttendanceTableProps) => {
  const handleDeleteAttendance = async (
    attendanceId: number,
    userId: number
  ) => {
    if (window.confirm('この出勤記録を削除しますか？')) {
      try {
        await deleteAttendanceById(attendanceId);
        toast.success('出勤記録が削除されました。');
        window.location.href = `/mypage/${userId}`;
      } catch (error) {
        toast.error('出勤記録の削除に失敗しました。');
      }
    }
  };
  const getEnergyLevelDetails = (level: number | null) => {
    switch (level) {
      case 1:
        return {
          label: '絶不調',
          color: 'bg-red-500 hover:bg-red-600 cursor-not-allowed',
        };
      case 2:
        return {
          label: '不調',
          color: 'bg-orange-500 hover:bg-orange-600 cursor-not-allowed',
        };
      case 3:
        return {
          label: '普通',
          color: 'bg-yellow-500 hover:bg-yellow-600 cursor-not-allowed',
        };
      case 4:
        return {
          label: '良好',
          color: 'bg-blue-500 hover:bg-blue-600 cursor-not-allowed',
        };
      case 5:
        return {
          label: '絶好調',
          color: 'bg-green-500 hover:bg-green-600 cursor-not-allowed',
        };
      default:
        return {
          label: '未登録',
          color: 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed',
        };
    }
  };

  return (
    <Card>
      <Title className="text-xl">
        {adminSessionToken ? `${fullname}` : 'Your Attendance Data'}
      </Title>
      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableHeaderCell>日付</TableHeaderCell>
            <TableHeaderCell>出勤時間</TableHeaderCell>
            <TableHeaderCell>退勤時間</TableHeaderCell>
            {adminSessionToken && <TableHeaderCell></TableHeaderCell>}
            <TableHeaderCell></TableHeaderCell>
            {adminSessionToken && <TableHeaderCell></TableHeaderCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{formatDateString(item.date)}</TableCell>
              <TableCell>
                {new Date(item.startTime).toLocaleTimeString('ja-JP')}
              </TableCell>
              <TableCell>
                {item.endTime
                  ? new Date(item.endTime).toLocaleTimeString('ja-JP')
                  : '未定'}
              </TableCell>
              {adminSessionToken && (
                <TableCell>
                  <Link
                    href={`/mypage/${item.userId}/description/${item.id}`}
                    passHref
                  >
                    <Button size="xs">詳細</Button>
                  </Link>
                </TableCell>
              )}
              <TableCell>
                {/* getEnergyLevelDetails関数からラベルと色を取得 */}
                {(() => {
                  const { label, color } = getEnergyLevelDetails(
                    item.energyLevel
                  );
                  return (
                    <Button className={`text-white ${color}`} size="xs">
                      {label}
                    </Button>
                  );
                })()}
              </TableCell>
              {adminSessionToken && (
                <TableCell>
                  <Button
                    size="xs"
                    className="bg-red-500 hover:bg-red-500 cursor-pointer" // ホバー時の色変更を無効化
                    onClick={() => handleDeleteAttendance(item.id, item.userId)}
                  >
                    削除
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AttendanceTable;
