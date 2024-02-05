'use client';
import React, { useState } from 'react';
import { updateAttendanceWithEnergyLevel } from '@/lib/actions';
import toast from 'react-hot-toast';

function MoodSelector({ userId }: { userId: number }) {
  const [mood, setMood] = useState(0);
  const moods = [
    { label: '絶好調', value: 5, color: 'bg-green-500 hover:bg-green-600' },
    { label: '良好', value: 4, color: 'bg-blue-500 hover:bg-blue-600' },
    { label: '普通', value: 3, color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: '不調', value: 2, color: 'bg-orange-500 hover:bg-orange-600' },
    { label: '絶不調', value: 1, color: 'bg-red-500 hover:bg-red-600' },
  ];

  const handleMoodSelection = async (value: number) => {
    setMood(value);
    const success = await updateAttendanceWithEnergyLevel(userId, value);
    if (success) {
      toast.success('気分を記録しました。');
    } else {
      toast.error('気分を記録できませんでした。');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-20 h-200 bg-gray-50">
      <div className="z-10 w-screen max-w-md overflow-hidden rounded-2xl border border-blue-200 shadow-xl bg-blue-50">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-blue-100 px-4 py-6 pt-8 text-center sm:px-16">
          <div className="text-xl flex h-10 items-center justify-center">
            今日の気分は？
          </div>
          <div className="text-sm text-gray-500">
            *出勤を先に記録してください*
          </div>
          <div className="flex space-x-4">
            {moods.map(({ label, value, color }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded-full text-white font-bold ${color} ${mood === value ? 'ring-2 ring-offset-2 ring-offset-blue-50 ring-white' : ''}`}
                onClick={() => handleMoodSelection(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            気分は何度でも変更できます。
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodSelector;
