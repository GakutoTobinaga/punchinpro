'use client';
import { Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { getUserEmailFromSession, getUserIdByEmail } from '@/lib/actions';
import { updateAttendanceWithEndTime } from '@/lib/actions';
import toast from 'react-hot-toast';

export default function UserOutButton() {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const userEmail = await getUserEmailFromSession();
      if (userEmail) {
        const fetchedUserId = await getUserIdByEmail(userEmail);
        setUserId(fetchedUserId);
      }
    }

    fetchData();
  }, []);

  const handleAttendanceOut = async () => {
    if (userId) {
      const isRecorded = await updateAttendanceWithEndTime(userId);
      if (!isRecorded) {
        toast.error('本日は退勤済みです。');
      } else {
        toast.success('退勤を記録しました。');
      }
    }
  };

  if (!userId) {
    return null;
  }
  return (
    <div>
      <Button
        onClick={handleAttendanceOut}
        size="xl"
        className="border-red-500 bg-red-500 hover:border-red-800 hover:bg-red-800"
      >
        退勤
      </Button>
    </div>
  );
}
