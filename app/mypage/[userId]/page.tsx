import Link from 'next/link';
import { Button, Card, Flex, Text, Title, Grid, Col } from '@tremor/react';
import { comment } from 'postcss';
import { displayUserAttendance2 } from '@/lib/actions';
import UserAllAttendance from '@/components/UserAllAttendance';

export default async function Page({ params }: { params: { userId: string } }) {
  let adminSessionToken = false;
  const id = Number(params.userId);

  if (id === 3) {
    console.log("admin detected.")
    adminSessionToken = true
  }
  console.log("sessiohn new" + id)
  // 詳細ページ表示のために、レポートをidで検索
  const userAllAttendance : any = await displayUserAttendance2(id);
  console.log(userAllAttendance)
  
  if (!userAllAttendance) {
    return <div>Loading...</div>;
  }

  if (adminSessionToken) {
    return (
      <div>
        <UserAllAttendance data={userAllAttendance} adminSessionToken={adminSessionToken}/>
      </div>
    );
  }

  return <div>No attendance data available.</div>;
}
