import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHead,
  TableRow,
  Title,
} from "@tremor/react";
import { Button } from "@tremor/react";
import Link from "next/link";

type AttendanceData = {
  id: number;
  userId: number;
  date: string;
  startTime: string;
  endTime?: string;
};

type AttendanceTableProps = {
  data: AttendanceData[];
  adminSessionToken: boolean;
};

// 日付をフォーマットする関数
const formatDateString = (dateString: string) => {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0から始まる月を1から始まる月に変換
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()]; // 曜日を取得
  return `${year}年${month}月${day}日（${dayOfWeek}）`; // フォーマットされた文字列を返す
};

const AttendanceTable = ({ data, adminSessionToken }: AttendanceTableProps) => {
  return (
    <Card>
      <Title>{adminSessionToken ? "Attendance Data" : "Your Attendance Data"}</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>日付</TableHeaderCell>
            <TableHeaderCell>出勤時間</TableHeaderCell>
            <TableHeaderCell>退勤時間</TableHeaderCell>
            {adminSessionToken && <TableHeaderCell></TableHeaderCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{formatDateString(item.date)}</TableCell>
              <TableCell>{new Date(item.startTime).toLocaleTimeString('ja-JP')}</TableCell>
              <TableCell>{item.endTime ? new Date(item.endTime).toLocaleTimeString('ja-JP') : '未定'}</TableCell>
              {adminSessionToken && (
                <TableCell>
                  <Link href={`/mypage/${item.userId}/description/${item.id}`} passHref>
                    <Button size="xs">詳細</Button>
                  </Link>
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
