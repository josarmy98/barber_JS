import { create } from 'zustand';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, role: user?.role || null }),
  setRole: (role) => set({ role }),
  login: async (email, password) => {
    set({ isLoading: true });
    // Mock login logic
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'John Doe',
        role: 'client',
      };
      set({ user: mockUser, isAuthenticated: true, role: 'client', isLoading: false });
    }, 1500);
  },
  logout: () => set({ user: null, isAuthenticated: false, role: null }),
  register: async (data) => {
    set({ isLoading: true });
    // Mock registration
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(),
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };
      set({ user: mockUser, isAuthenticated: true, role: data.role, isLoading: false });
    }, 1500);
  },
}));
