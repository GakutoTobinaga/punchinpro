// if got date datas... update them to new.
export type userApplicationToUpdate = {
  userId: number;
  newDateIn: Date | undefined;
  newDateOut: Date | undefined;
};
export type AttendanceData = {
  date: string;
  startTime: string;
  endTime?: string | null;
};

export type AttendanceTableProps = {
  data: AttendanceData[];
};

export type UserData = {
  id: number;
  firstname: string;
  lastname: string;
};

export type AttendanceCorrectionType = {
  id: number;
  userId: number;
  originalAttendanceId: number;
  requestedChange: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: number;
};
