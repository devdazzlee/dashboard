'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isLive, setIsLive] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/site-status') // change to production API when deploying
      .then(res => res.json())
      .then(data => setIsLive(data.isLive));
  }, []);

  const handleToggle = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/api/site-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ live: !isLive }),
    });
    if (res.ok) {
      const data = await res.json();
      setIsLive(data.isLive);
    }
    setLoading(false);
  };

  if (isLive === null) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">🛠 Website Maintenance Toggle</h1>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isLive} onChange={handleToggle} disabled={loading} />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
          <span className="ml-3 text-sm font-medium">{isLive ? 'Website Live' : 'Under Maintenance'}</span>
        </label>
      </div>
    </div>
  );
}
