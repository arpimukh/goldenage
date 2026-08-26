const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchListings = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/communities/listings?${params}`);
  if (!response.ok) throw new Error('Failed to fetch listings');
  return response.json();
};

export const createBooking = async (bookingData) => {
  const response = await fetch(`${API_BASE_URL}/communities/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
};

export const createServiceRequest = async (serviceData) => {
  const response = await fetch(`${API_BASE_URL}/communities/service-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(serviceData),
  });
  if (!response.ok) throw new Error('Failed to create service request');
  return response.json();
};

export const signupProvider = async (providerData) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(providerData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Signup failed');
  return data;
};

export const loginProvider = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};
