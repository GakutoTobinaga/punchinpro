'use client';
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => updateTime(), 1000);
    updateTime();
    return () => clearInterval(timerId);
  }, []);

  const updateTime = () => {
    const currentTime = new Date();
    setTime(currentTime);
  };

  return (
    <div className="flex justify-center items-center mb-10 mt-10">
      <div className="text-6xl font-bold text-gray-800">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Clock;
