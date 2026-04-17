import { create } from 'zustand';
import { User, Role, Barbershop, Booking } from '@/types';
import { MOCK_SHOPS, MOCK_BOOKINGS } from '@/services/mock-data';

interface AppState {
  // Auth
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role) => void;
  logout: () => void;

  // Marketplace
  shops: Barbershop[];
  selectedShop: Barbershop | null;
  setSelectedShop: (shop: Barbershop | null) => void;
  
  // Bookings
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;

  // Search/Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth Defaults
  user: {
    id: 'c1',
    email: 'client@example.com',
    fullName: 'John Client',
    role: 'client',
    createdAt: new Date().toISOString(),
  },
  role: 'client',
  isAuthenticated: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, role: user?.role || null }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: null, isAuthenticated: false }),

  // Marketplace
  shops: MOCK_SHOPS,
  selectedShop: null,
  setSelectedShop: (shop) => set({ selectedShop: shop }),

  // Bookings
  bookings: MOCK_BOOKINGS,
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
  cancelBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.map((b) => b.id === bookingId ? { ...b, status: 'CANCELED' } : b)
  })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
