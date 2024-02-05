'use client';
import React, { useEffect, useState } from 'react';
import AllUserInfos from '@/components/AllUserInfos';
import LoadingDots from '@/components/loading/loading-dots';
import { getAllUsersWithNames } from '@/lib/actions';
import toast from 'react-hot-toast';
import type { UserData } from '@/lib/types';
import { getUserEmailFromSession } from '@/lib/actions';

export default function AdminPage() {
  const [userAllDatas, setUserAllDatas] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const data: UserData[] = await getAllUsersWithNames();
      setUserAllDatas(data);
      toast.success('Data has been fetched');
    } catch (error) {
      toast.error('Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataAndCheckAdmin = async () => {
      const email = await getUserEmailFromSession();
      if (typeof email === 'string' && email === 'admin@mail.com') {
        setIsAdmin(true);
        fetchData();
      } else {
        console.error('NG to access');
      }
    };

    fetchDataAndCheckAdmin();
  }, []);

  if (!isAdmin) {
    return (
      <div className="bg-red-100 text-red-800 text-center p-4 rounded-md">
        You have no token to access.
      </div>
    );
  }

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div>
      <AllUserInfos data={userAllDatas} />
    </div>
  );
}
