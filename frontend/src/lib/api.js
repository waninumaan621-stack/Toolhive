const BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  get: async (path) => {
    const res = await fetch(`${BASE}${path}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },
  post: async (path, body) => {
    const token = localStorage.getItem('th_admin_token');
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },
  put: async (path, body) => {
    const token = localStorage.getItem('th_admin_token');
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  },
};

// Track visit
export const trackVisit = async (tool, category) => {
  try {
    await fetch(`${BASE}/stats/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, category }),
    });
  } catch {}
};
