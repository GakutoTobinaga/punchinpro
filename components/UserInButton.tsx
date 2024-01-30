// UserInButton コンポーネント
"use client"; // これによりコンポーネントがクライアントサイドでのみ実行されることが保証されます

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
  }, []); // 空の依存配列を使って、コンポーネントのマウント時にのみ実行

  const handleAttendanceIn = async () => {
    if (userId) {
      const isRecorded = await recordAttendance(userId);
      if (!isRecorded) {
        toast.error("本日は出勤済みです。")
        // ここでトースト通知などの処理を追加する
      } else {
        toast.success("出勤を記録しました。")
      }
    }
  };
  

  if (!userId) {
    return null; // userId がない場合は何も表示しない
  }

  return (
    <div>
      <Button onClick={handleAttendanceIn} size="xl" className="border-blue-500 bg-blue-500 hover:border-blue-800 hover:bg-blue-800">出勤</Button>
    </div>
  );
}
