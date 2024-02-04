import { displayUserAttendance2, fetchUserNamesById } from '@/lib/actions';
import UserAllAttendance from '@/components/UserAllAttendance';
import { fetchUserEmail } from '@/lib/actions';

export default async function Page({ params }: { params: { userId: string } }) {
  let adminSessionToken = false;
  const id = Number(params.userId);
  const nameData = await fetchUserNamesById(id);
  const fullname = nameData?.firstName + " " + nameData?.lastName
  const email = await fetchUserEmail();
  if (typeof email === 'string' && email === 'admin@mail.com') {
    adminSessionToken = true
  }
  const userAllAttendance : any = await displayUserAttendance2(id);
  
  if (!userAllAttendance) {
    return <div>NO USERS</div>;
  }

  if (adminSessionToken) {
    return (
      <div>
        <UserAllAttendance data={userAllAttendance} adminSessionToken={adminSessionToken} fullname={fullname}/>
      </div>
    );
  } else {
    return (
      <div>
        <UserAllAttendance data={userAllAttendance} adminSessionToken={adminSessionToken} fullname={fullname}/>
      </div>
    );
    }

}
