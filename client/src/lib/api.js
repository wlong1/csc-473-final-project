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

export async function getAllListings() {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  const body = await res.json();

  if (!res.ok) {
      throw new Error(body.message || 'Failed to fetch listings');
  }

  return body.map(listing => ({
      ...listing,
      imageUrl: listing.imagePath
          ? `${API_URL}/public/uploads/${listing.imagePath}`
          : null
  }));
}

export async function getListing(listingId) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/${listingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to fetch listing');
  }

  if (body.imagePath) {
    body.imageUrl = `${API_URL}/public/uploads/${body.imagePath}`;
  }

  return body;
}

export async function updateListing(listingId, { title, description, lostDate, active }) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/${listingId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, lostDate, active })
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to update listing');
  }
  return body;
}

export async function getUserClaims() {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/claim`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || 'Failed to fetch user claims');
  }

  return body;
}

export async function getListingClaim(listingId) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/${listingId}/claim`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const body = await res.json();
  
  if (!res.ok) {
    throw new Error(body.message || 'Failed to fetch claims');
  }

  return body;
}

export const getPendingClaims = async () => {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/claim/pending`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to fetch pending claims');
  }

  return body;
};


export async function createClaim(listingId, message) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/${listingId}/claim`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to create claim');
  }

  return body;
}

export async function updateClaim(claimId, message) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/claim/${claimId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to update claim');
  }

  return body;
}

export async function updateClaimStatus(claimId, claimStatus) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/claim/${claimId}/claimStatus`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ claimStatus })
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to update claim status');
  }

  return body;
}

export async function deleteClaim(claimId) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}/api/listing/claim/${claimId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || 'Failed to delete claim');
  }

  return body;
}


export function sseListen(eventType, callback) {
  const es = new EventSource(`${API_URL}/api/listing/updates`);

  es.onerror = () => {
    console.error('SSE connection error');
  };


  const handler = (e) => {
    try {
      callback(JSON.parse(e.data));
    } catch (err) {
      console.error('SSE data parsing error:', err);
    }
  };
  es.addEventListener(eventType, handler);

  
  return () => {
    es.removeEventListener(eventType, handler);
    es.close();
  };
}

export function listingURLFix(listing) {
  if (listing.imagePath && !listing.imageUrl) {
    listing.imageUrl = `${API_URL}/public/uploads/${listing.imagePath}`;
  }
  return listing;
}