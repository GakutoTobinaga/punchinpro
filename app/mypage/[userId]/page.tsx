import {
  getUserAttendanceRecordsById,
  getUserNamesById,
  getUserEmailFromSession,
} from '@/lib/actions';
import UserAllAttendance from '@/components/UserAllAttendance';
export type AttendanceRecord = {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date | null;
  userId: number;
};

export type AttendanceRecordsResponse = AttendanceRecord[] | undefined;

export default async function Page({ params }: { params: { userId: string } }) {
  let adminSessionToken = false;
  const id = Number(params.userId);
  const nameData = await getUserNamesById(id);
  const fullname = nameData?.firstName + ' ' + nameData?.lastName;
  const email = await getUserEmailFromSession();
  if (typeof email === 'string' && email === 'admin@mail.com') {
    adminSessionToken = true;
  }
  const userAllAttendance: any = await getUserAttendanceRecordsById(id);

  if (!userAllAttendance) {
    return <div>NO USERS</div>;
  }
  return (
    <div>
      <UserAllAttendance
        data={userAllAttendance}
        adminSessionToken={adminSessionToken}
        fullname={fullname}
      />
    </div>
  );
}
