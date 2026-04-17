import { create } from 'zustand';
import { Barbershop, BarberProfile, Booking } from '@/types';
import { MOCK_SHOPS, MOCK_BARBERS } from '@/services/mock-data';

interface ShopState {
  shops: Barbershop[];
  barbers: BarberProfile[];
  bookings: Booking[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchShops: () => Promise<void>;
  createBooking: (booking: Partial<Booking>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

export const useShopStore = create<ShopState>((set) => ({
  shops: MOCK_SHOPS as any, // Use centralized mock data
  barbers: MOCK_BARBERS as any,
  bookings: [],
  isLoading: false,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchShops: async () => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      set({ isLoading: false });
    }, 1000);
  },
  createBooking: async (booking) => {
    set({ isLoading: true });
    setTimeout(() => {
      const newBooking: Booking = {
        id: Math.random().toString(),
        status: 'CONFIRMED',
        ...booking as any,
      };
      set((state) => ({ 
        bookings: [newBooking, ...state.bookings],
        isLoading: false 
      }));
    }, 1500);
  },
  cancelBooking: async (bookingId) => {
    set((state) => ({
      bookings: state.bookings.map((b) => 
        b.id === bookingId ? { ...b, status: 'CANCELED' } : b
      ),
    }));
  },
}));
