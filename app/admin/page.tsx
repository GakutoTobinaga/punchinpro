"use client"
import React, { useEffect, useState } from 'react';
import UserAllAttendance from '@/components/UserAllAttendance';
import AllUserInfos from '@/components/AllUserInfos';
import { AttendanceData } from '@/lib/types';
import { fetchAllUser, fetchAllUser2 } from '@/lib/actions';
import toast from 'react-hot-toast';
import type { UserData } from '@/lib/types';

export default function AdminPage() {
  const [userAllDatas, setUserAllDatas] = useState<AttendanceData[]>([]);
  const [userAllDatas2, setUserAllDatas2] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data : any = await fetchAllUser();
      const data2 : UserData[] = await fetchAllUser2();
      setUserAllDatas(data);
      setUserAllDatas2(data2);
      toast.success("Data has been fetched")
    } catch (error) {
      toast.error("Failed to fetch data.")
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // マウント時にデータを取得

  if(isLoading) {
    return <div>Loading...</div>;
  }
  // データがある場合にコンポーネントを表示
  if (userAllDatas.length > 0) {
    return (
      <div>
        <div>
          <AllUserInfos data={userAllDatas2}/>
        </div>
      </div>
    );
  }
}
