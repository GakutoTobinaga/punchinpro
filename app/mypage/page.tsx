"use client"
import React, { useEffect, useState } from 'react';
import UserAllAttendance from '@/components/UserAllAttendance';
import { displayUserAttendance } from '@/lib/actions';
import { AttendanceData } from '@/lib/types';

export default function Mypage() {
  const [userAllAttendance, setUserAllAttendance] = useState<AttendanceData[]>([]);

  const fetchData = async () => {
    const data = await displayUserAttendance();
    setUserAllAttendance(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // マウント時にデータを取得

  // userAllAttendance 配列がデータを含むか確認
  if (userAllAttendance === null) {
    return <div>Loading...</div>;
  }

  // データがある場合にコンポーネントを表示
  if (userAllAttendance.length > 0) {
    return (
      <div>
        <UserAllAttendance data={userAllAttendance} />
      </div>
    );
  }

  // データがない場合の表示
  return <div>No attendance data available.</div>;
}
