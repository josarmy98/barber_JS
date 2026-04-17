# BarberHub 💈

A premium barbershop marketplace and booking platform built with Expo, React Native, and TypeScript.

## 🚀 Key Features
- **Role-Based Experience**: Tailored dashboards for Clients, Barbers, Shop Owners, and Admins.
- **Discovery Engine**: Map-based and list-based shop discovery with proximity filtering.
- **Advanced Booking**: Real-time slot management and booking flow (ready for Supabase).
- **Premium Aesthetics**: Modern UI with dark/light mode support and smooth transitions.
- **Business Suite**: Analytics, staff management, and membership tools for shop owners.

## 📁 Architecture Overview
```text
BarberHub/
├── app/                  # Role-based routing ((auth), (client), (barber), (owner), (admin))
├── components/           # UI, Booking, and Shared atomic components
├── constants/            # Design system tokens and app configuration
├── hooks/                # Business logic hooks (auth, maps, data fetching)
├── store/                # Zustand global state (Auth, UI, Settings)
├── types/                # Centralized TypeScript entity definitions
└── services/             # API/Supabase client integraton
```

## 🔐 Authentication & Roles
The app uses a root guard in `app/_layout.tsx` to automatically redirect users based on their role:
- **Client**: `/ (client)` - Browse and book.
- **Barber**: `/ (barber)` - Manage schedule and earnings.
- **Owner**: `/ (owner)` - Shop management and analytics.
- **Admin**: `/ (admin)` - System moderation.

## 🛠 Tech Stack
- **Framework**: Expo SDK 50+ / Expo Router
- **State**: Zustand
- **Styling**: Native Styles with custom design tokens
- **Icons**: Ionicons
- **Backend**: Prepared for Supabase integration
expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
