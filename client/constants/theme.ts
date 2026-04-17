/**
 * Premium Theme for BarberHub
 */

export const Colors = {
  primary: '#1A1A1A', // Charcoal Black
  accent: '#D4AF37',  // Metallic Gold
  secondary: '#4A4A4A',
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#ED6C02',
  info: '#0288D1',
  
  light: {
    primary: '#1A1A1A',
    success: '#2E7D32',
    error: '#D32F2F',
    text: '#1A1A1A',
    textSecondary: '#666666',
    background: '#FFFFFF',
    card: '#F5F5F5',
    border: '#E0E0E0',
    tint: '#1A1A1A',
    icon: '#666666',
    tabIconDefault: '#999999',
    tabIconSelected: '#1A1A1A',
    gold: '#D4AF37',
  },
  dark: {
    primary: '#121212',
    success: '#2E7D32',
    error: '#D32F2F',
    text: '#F5F5F5',
    textSecondary: '#AAAAAA',
    background: '#121212',
    card: '#1E1E1E',
    border: '#333333',
    tint: '#D4AF37',
    icon: '#AAAAAA',
    tabIconDefault: '#666666',
    tabIconSelected: '#D4AF37',
    gold: '#D4AF37',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  }
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '800' },
  h2: { fontSize: 24, fontWeight: '700' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};
