// components/TimeAdjustmentRequest.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TimeAdjustmentRequestProps {
    timeType: 'startTime' | 'endTime';
    initialValue: string;
  }
  
const TimeAdjustmentRequest = ({timeType, initialValue} : {timeType : string, initialValue: string}) => {

  const [timeValue, setTimeValue] = useState(initialValue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true); // フォーム送信時にモーダルを開く
  };

  const handleConfirm = () => {
    console.log(`変更 ${timeType}: ${timeValue}`);
    // ここに申請送信ロジックを実装
    setIsModalOpen(false); // 確認後にモーダルを閉じる
    // router.push('/') は、必要に応じて適切なページに戻るために使用します。
    router.push("/")
    
  };

  const handleCancel = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div>
      <h2>{timeType === 'startTime' ? '出勤時間修正' : '退勤時間修正'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="time" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} />
        <button type="submit">修正申請</button>
      </form>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>修正を確認</h3>
            <p>{`新しい${timeType === 'startTime' ? '出勤' : '退勤'}時間: ${timeValue}`}</p>
            <button onClick={handleConfirm}>確認</button>
            <button onClick={handleCancel}>キャンセル</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeAdjustmentRequest;
