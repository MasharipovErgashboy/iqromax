export const COLORS = {
  primary: '#22c55e', // Iqromax Green
  primaryDark: '#16a34a',
  primaryLight: '#bcf1d1',
  secondary: '#facc15', // Gold/Yellow
  accent: '#fb923c', // Orange
  background: '#f8fafc',
  white: '#ffffff',
  black: '#000000',
  error: '#ef4444',
  success: '#22c55e',
  xp: '#8b5cf6', // Vibrant Purple for XP
  streak: '#f97316', // Bright Orange for Streak
  level: '#3b82f6', // Bright Blue for Levels
  gold: '#fbbf24',
  silver: '#94a3b8',
  bronze: '#d97706',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const LIGHT_THEME = {
  background: '#F8FAFB',
  card: '#ffffff',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  navbar: '#FFFFFF',
  ...COLORS
};

export const DARK_THEME = {
  background: '#020617', // Pitch Dark Navy/Black
  card: '#0F172A',       // Slate 900
  cardElevated: '#1E293B', // Slate 800
  text: '#F8FAFC',       // Slate 50
  textSecondary: '#94A3B8', // Slate 400
  border: '#1E293B',    // Slate 800
  navbar: '#0F172A',
  glow: '#4ADE80',       // Emerald 400
  accentGlow: '#FDBA74', // Orange 300
  ...COLORS,
  primary: '#10B981',    // Emerald 500
  accent: '#F97316',     // Orange 500
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
  xl: 30,
  full: 9999,
};

export const SHADOWS = {
  light: {
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
    elevation: 5,
  },
  glow: {
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  button3d: {
    shadowColor: '#000',
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
