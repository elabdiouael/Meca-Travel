import { TravelPackage, BookingRequest } from "@/types";

const API_URL = "http://localhost:8080/api";

export const api = {
  // --- PUBLIC ---
  getAllPackages: async (): Promise<TravelPackage[]> => {
    const res = await fetch(`${API_URL}/packages`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch packages');
    return res.json();
  },

  getPackageById: async (id: string): Promise<TravelPackage> => {
    const res = await fetch(`${API_URL}/packages/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Package not found (ID: ${id})`);
    return res.json();
  },

  // --- AUTH ---
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Registration failed');
    }
    return res.text();
  },

  // --- BOOKINGS ---
  createBooking: async (optionId: number, data: BookingRequest, token: string) => {
    const res = await fetch(`${API_URL}/bookings/${optionId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Booking failed');
    return res.json();
  },

  // Admin: Jib koulchi
  getAllBookings: async (token: string) => {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  // Client: Jib dyali
  getMyBookings: async (token: string) => {
    const res = await fetch(`${API_URL}/bookings/my-bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch my bookings');
    return res.json();
  },

  // Admin: Update Status
  updateBookingStatus: async (id: number, status: string, token: string) => {
    const res = await fetch(`${API_URL}/bookings/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.text();
  }
};