import { useEffect, useState } from 'react';

let cachedAdCode = null;
let cacheTime = 0;

const getAdCode = async () => {
  if (cachedAdCode !== null && Date.now() - cacheTime < 5 * 60 * 1000) return cachedAdCode;
  try {
    const BASE = import.meta.env.VITE_API_URL || '/api';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${BASE}/stats/public`, { signal: controller.signal });
    clearTimeout(timeout);
    const data = await res.json();
    cachedAdCode = data.adCode || '';
    cacheTime = Date.now();
    return cachedAdCode;
  } catch {
    cachedAdCode = '';
    cacheTime = Date.now();
    return '';
  }
};

export default function AdSlot({ type = 'banner', className = '' }) {
  const [adCode, setAdCode] = useState('');

  useEffect(() => {
    getAdCode().then(code => setAdCode(code || ''));
  }, []);

  // Render NOTHING if no ad code pasted yet
  if (!adCode) return null;

  const minH = type === 'sidebar' ? '250px' : type === 'rectangle' ? '200px' : '90px';

  return (
    <div
      className={`w-full overflow-hidden rounded-xl ${className}`}
      style={{ minHeight: minH }}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
}
