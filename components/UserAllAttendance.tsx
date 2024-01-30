import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHeaderCell,
    TableHead,
    TableRow,
    Text,
    Title,
  } from "@tremor/react";
  
  type AttendanceData = {
    date: string;
    startTime: string;
    endTime?: string;
  };
  
  type AttendanceTableProps = {
    data: AttendanceData[];
  };
  
  const AttendanceTable: React.FC<AttendanceTableProps> = ({ data }) => (
    <Card>
      <Title>Your Attendance Data</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>日付</TableHeaderCell>
            <TableHeaderCell>Start Time</TableHeaderCell>
            <TableHeaderCell>End Time</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{formatDateString(item.date)}</TableCell>
              {/* StartTimeを"00:00"の形式に変更 */}
              <TableCell>
  {typeof item.startTime === 'string' ? (
    new Date(item.startTime).toLocaleTimeString()
  ) : (
    item.startTime instanceof Date ? item.startTime.toLocaleTimeString() : 'N/A'
  )}
</TableCell>
<TableCell>
  {typeof item.endTime === 'string' ? (
    new Date(item.endTime).toLocaleTimeString()
  ) : (
    item.endTime instanceof Date ? item.endTime.toLocaleTimeString() : 'N/A'
  )}
</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
  
  export default AttendanceTable;
  
  // 日付をフォーマットする関数
  function formatDateString(dateString: string) {
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    // フォーマットされた文字列を返す
    return `${year}年${month}月${day}日（${dayOfWeek}）`;
  }
  
  // 時間をフォーマットする関数
  function formatTime(timeString: string) {
    const [hours, minutes] = timeString.split(":");
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }
  