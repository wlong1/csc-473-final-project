export const API_URL = import.meta.env.VITE_API_URL;

export async function register(data) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Registration failed');
  }

  return body;
}
