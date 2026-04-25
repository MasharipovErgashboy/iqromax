export const COLORS = {
  primary: '#10B981', // Premium Emerald Green
  primaryDark: '#059669',
  primaryLight: '#D1FAE5',
  secondary: '#F59E0B', // Premium Amber
  accent: '#6366F1', // Indigo for accent
  background: '#F8FAFC',
  white: '#FFFFFF',
  black: '#1E293B', // Soft Slate instead of pure black
  error: '#EF4444',
  success: '#10B981',
  xp: '#8B5CF6', 
  streak: '#F97316', 
  level: '#3B82F6', 
  gold: '#FBBF24',
  silver: '#94A3B8',
  bronze: '#D97706',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export const LIGHT_THEME = {
  background: '#F8FAFB',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  navbar: '#FFFFFF',
  ...COLORS
};

export const DARK_THEME = {
  background: '#020617',
  card: '#0F172A',
  cardElevated: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#1E293B',
  navbar: '#0F172A',
  glow: '#10B981',
  accentGlow: '#FDBA74',
  ...COLORS,
  primary: '#10B981',
  accent: '#F97316',
  white: '#F8FAFC',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  xxl: 40,
  full: 9999,
};

export const SHADOWS = {
  light: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  large: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  glow: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  button3d: {
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
  }
};

export const GLASS = {
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dark: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  }
};
