'use client';
import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import UserInButton from './UserInButton';
import UserOutButton from './UserOutButton';
import MoodSelector from './MoodSelector';
import { getUserIdByEmail, getUserEmailFromSession } from '@/lib/actions';

function UserDashboard({ username }: { username: string | null }) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const email = await getUserEmailFromSession();
      if (typeof email === 'string') {
        const id = await getUserIdByEmail(email);
        setUserId(id);
      }
    };

    fetchUserId();
  }, []);
  if (userId) {
    return (
      <>
        <div className="flex pt-10 h-800 items-center justify-center">
          <div className="z-10 w-screen max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl bg-blue-50">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
              <div className="text-xl">{username}</div>
              <h3 className="text-2xl font-semibold">出退勤記録カード</h3>
              <p className="text-sm text-gray-500">勤怠を記録しましょう。</p>
            </div>
            <Clock />
            <div className="w-full">
              <div className="flex justify-between h-90 pb-10 items-center mx-10">
                <UserInButton />
                <UserOutButton />
              </div>
            </div>
          </div>
        </div>
        <MoodSelector userId={userId} />
      </>
    );
  } else {
    return (
      <>
        <div className="flex h-80 items-center justify-center">
          <div className="text-3xl">出退勤記録にはログインが必要です。</div>
        </div>
      </>
    );
  }
}

export default UserDashboard;
