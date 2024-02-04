"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@tremor/react";
import { fetchUserEmail, fetchUserId, recordAttendance } from "@/lib/actions";
import toast from 'react-hot-toast';

export default function UserInButton() {
  const [userId, setUserId] = useState<number | null>(null);


  useEffect(() => {
    async function fetchData() {
      const userEmail = await fetchUserEmail();
      if (userEmail) {
        const fetchedUserId = await fetchUserId(userEmail);
        setUserId(fetchedUserId);
      }
    }

    fetchData();
  }, []);

  const handleAttendanceIn = async () => {
    if (userId) {
      const isRecorded = await recordAttendance(userId);
      if (!isRecorded) {
        toast.error("本日は出勤済みです。")
      } else {
        toast.success("出勤を記録しました。")
      }
    }
  };
  

  if (!userId) {
    return null;
  }

  return (
    <div>
      <Button onClick={handleAttendanceIn} size="xl" className="border-blue-500 bg-blue-500 hover:border-blue-800 hover:bg-blue-800">出勤</Button>
    </div>
  );
}
