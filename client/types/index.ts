export type UserRole = 'client' | 'barber' | 'owner' | 'admin';
export type Role = UserRole; // Alias for backward compatibility if needed

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface ClientProfile extends User {
  role: 'client';
  memberships: Membership[];
}

export interface BarberProfile extends User {
  role: 'barber';
  shopId?: string;
  bio?: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  services: Service[];
  schedule: WorkingHours[];
}

export interface OwnerProfile extends User {
  role: 'owner';
  shopId: string;
  subscriptionPlan: SubscriptionPlan;
}

export interface AdminProfile extends User {
  role: 'admin';
}

export interface Barbershop {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  rating: number;
  reviewCount: number;
  ownerId: string;
  services: Service[];
  barbers: string[]; // barber IDs
  workingHours: WorkingHours[];
  amenities: string[];
  isPremium: boolean;
}

export type SubscriptionPlan = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface Membership {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  expiryDate: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: 'haircut' | 'beard' | 'styling' | 'kids' | 'shave' | 'other' | string;
}

export interface WorkingHours {
  day: string; // 'MON', 'TUE', etc.
  isOpen: boolean;
  start: string; // HH:mm
  end: string;   // HH:mm
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  shopId: string;
  shopName: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO string
  time: string; // "14:30"
  duration: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  targetId: string; // shopId or barberId
  targetType: 'SHOP' | 'BARBER';
}
