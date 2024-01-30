"use client"
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // コンポーネントがマウントされた後に最初の更新を遅らせる
    const timerId = setInterval(() => updateTime(), 1000);
    // マウント後すぐにクライアントで時刻を更新
    updateTime();
    return () => clearInterval(timerId);
  }, []);

  const updateTime = () => {
    const currentTime = new Date(); // サーバーサイドとクライアントサイドで同じ方法で時刻を取得
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


/*
"use client"
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => updateTime(), 1000);
    return () => clearInterval(timerId);
  }, []);

  const updateTime = () => {
    setTime(new Date());
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
*/
