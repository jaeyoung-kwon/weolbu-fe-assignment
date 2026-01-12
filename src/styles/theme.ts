import '@emotion/react';

const neutralScale = {
  0: '#ffffff',
  50: '#f8f9fb',
  100: '#f2f4f8',
  200: '#e2e6f0',
  300: '#c9d0e0',
  400: '#a7b1c9',
  500: '#8590ab',
  600: '#636c87',
  700: '#4b5267',
  800: '#2f3442',
  900: '#1d2030',
} as const;

export const theme = {
  colors: {
    brand: {
      primary: '#4b6bfb',
      primaryStrong: '#1f3bd4',
      primaryMuted: '#e5e9ff',
      accent: '#ff9d2e',
      accentStrong: '#e87800',
    },
    state: {
      success: '#1fd38d',
      warning: '#ffce52',
      danger: '#f0455c',
      info: '#50b5ff',
    },
    background: {
      canvas: neutralScale[50],
      surface: neutralScale[0],
      disabled: '#f6f8ff',
    },
    border: {
      subtle: neutralScale[200],
      strong: neutralScale[400],
    },
    text: {
      primary: neutralScale[900],
      secondary: neutralScale[600],
      disabled: neutralScale[500],
      inverse: neutralScale[0],
    },
    neutral: neutralScale,
  },
  typography: {
    fontFamily:
      "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif",
    size: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  shadow: {
    card: '0 20px 40px rgba(36, 47, 89, 0.08)',
    overlay: '0 10px 25px rgba(8, 12, 31, 0.25)',
    focus: '0 0 0 3px rgba(75, 107, 251, 0.45)',
  },
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1200,
  },
  zIndex: {
    behind: -1,
    base: 0,
    content: 1,
    elevated: 10,
    header: 100,
    floatingButton: 400,
    overlay: 900,
    modal: 1000,
    toast: 9000,
  },
} as const;

export type AppTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends AppTheme {
    __emotionTheme?: never;
  }
}
