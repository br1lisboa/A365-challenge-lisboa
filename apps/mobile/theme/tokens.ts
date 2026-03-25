export const colors = {
  background: '#f9fafb',
  surface: '#ffffff',

  text: {
    primary: '#111827',
    secondary: '#374151',
    tertiary: '#6b7280',
    placeholder: '#9ca3af',
    inverse: '#ffffff',
  },

  border: {
    default: '#d1d5db',
    light: '#e5e7eb',
  },

  primary: {
    default: '#2563eb',
    accent: '#3b82f6',
    dark: '#1d4ed8',
    surface: '#eff6ff',
    border: '#dbeafe',
    text: '#1e3a5f',
  },

  status: {
    activa: { bg: '#dcfce7', text: '#15803d' },
    cancelada: { bg: '#fee2e2', text: '#b91c1c' },
    finalizada: { bg: '#f3f4f6', text: '#374151' },
  },

  warning: {
    surface: '#fefce8',
    text: '#a16207',
  },
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
} as const

export const fontSize = {
  sm: 12,
  base: 14,
  lg: 16,
} as const

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
}

export const radius = {
  sm: 8,
  md: 10,
  lg: 14,
  full: 20,
} as const

export const shadow = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
} as const
