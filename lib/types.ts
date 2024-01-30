// if got date datas... update them to new.
export type userApplicationToUpdate = {
    userId: number;
    newDateIn: Date | undefined;
    newDateOut: Date | undefined;
}
export type AttendanceData = {
    date: string;
    startTime: string;
    endTime?: string;
  };

export type AttendanceTableProps = {
    data: AttendanceData[];
  };