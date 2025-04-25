export const API_URL = import.meta.env.VITE_API_URL;
import { getAuthToken } from '../lib/auth';

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

export async function login(data) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Login failed');
  }

  return body;
}

export async function verifyToken() {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_URL}/api/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function createListing(data) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: data,
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to create listing');
  }

  return body;
}