import { Barbershop, BarberProfile, Service, Booking } from '../types';

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Premium Haircut', description: 'Includes wash, cut, and style', price: 45, durationMinutes: 45, category: 'haircut' },
  { id: 's2', name: 'Beard Trim', description: 'Beard shaping and grooming', price: 25, durationMinutes: 20, category: 'beard' },
  { id: 's3', name: 'The Gentleman Package', description: 'Haircut + Beard trim + Hot towel', price: 65, durationMinutes: 75, category: 'styling' },
  { id: 's4', name: 'Hot Towel Shave', description: 'Traditional straight razor shave', price: 35, durationMinutes: 30, category: 'beard' },
];

export const MOCK_BARBERS: BarberProfile[] = [
  {
    id: 'b1',
    fullName: 'Marco "The Blade" Rossi',
    email: 'marco@barberhub.com',
    role: 'barber',
    avatarUrl: 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?w=400',
    specialties: ['Fades', 'Taper', 'Straight Razor'],
    rating: 4.9,
    reviewCount: 128,
    isAvailable: true,
    services: MOCK_SERVICES,
    schedule: [
      { day: 'MON', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'TUE', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'WED', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'THU', isOpen: true, start: '09:00', end: '18:00' },
      { day: 'FRI', isOpen: true, start: '09:00', end: '18:00' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'b2',
    fullName: 'Carlos Diaz',
    email: 'carlos@barberhub.com',
    role: 'barber',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
    specialties: ['Classic Cuts', 'Kid\'s Cuts'],
    rating: 4.7,
    reviewCount: 85,
    isAvailable: true,
    services: MOCK_SERVICES,
    schedule: [{ day: 'SAT', isOpen: true, start: '10:00', end: '16:00' }],
    createdAt: '2024-02-10T10:00:00Z',
  }
];

export const MOCK_SHOPS: Barbershop[] = [
  {
    id: 'shop1',
    name: 'The Golden Scissor',
    description: 'Luxury grooming for the modern gentleman. Experience our premium services in a vintage atmosphere.',
    address: '123 Ocean Drive, Miami, FL 33139',
    latitude: 25.7825,
    longitude: -80.1299,
    images: [
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
      'https://images.unsplash.com/photo-1621605815841-2cd6180bf378?w=800'
    ],
    rating: 4.8,
    reviewCount: 342,
    ownerId: 'o1',
    services: MOCK_SERVICES,
    barbers: ['b1', 'b2'],
    workingHours: [
      { day: 'MON', isOpen: true, start: '09:00', end: '20:00' },
      { day: 'TUE', isOpen: true, start: '09:00', end: '20:00' },
      { day: 'WED', isOpen: true, start: '09:00', end: '20:00' },
      { day: 'THU', isOpen: true, start: '09:00', end: '20:00' },
      { day: 'FRI', isOpen: true, start: '09:00', end: '21:00' },
      { day: 'SAT', isOpen: true, start: '10:00', end: '18:00' },
      { day: 'SUN', isOpen: false, start: '00:00', end: '00:00' },
    ],
    amenities: ['Free WiFi', 'Complimentary Drinks', 'Air Conditioning', 'Parking'],
    isPremium: true,
  },
  {
    id: 'shop2',
    name: 'Vintage Cutz',
    description: 'Old school vibes with new school style. Best fades in town.',
    address: '456 Brickell Ave, Miami, FL 33131',
    latitude: 25.7617,
    longitude: -80.1918,
    images: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800'
    ],
    rating: 4.6,
    reviewCount: 215,
    ownerId: 'o2',
    services: MOCK_SERVICES.slice(0, 2),
    barbers: ['b3'],
    workingHours: [
      { day: 'MON', isOpen: true, start: '10:00', end: '19:00' },
      { day: 'TUE', isOpen: true, start: '10:00', end: '19:00' },
    ],
    amenities: ['Music', 'TV'],
    isPremium: false,
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk1',
    clientId: 'c1',
    clientName: 'John Doe',
    shopId: 'shop1',
    shopName: 'The Golden Scissor',
    barberId: 'b1',
    barberName: 'Marco Rossi',
    serviceId: 's1',
    serviceName: 'Premium Haircut',
    date: '2024-05-20T00:00:00Z',
    time: '14:30',
    duration: 45,
    totalPrice: 45,
    status: 'CONFIRMED',
    createdAt: '2024-05-15T12:00:00Z',
  }
];
