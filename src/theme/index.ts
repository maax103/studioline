import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Definindo as cores personalizadas baseadas nos requisitos
const sage: MantineColorsTuple = [
  '#f4f7f4',
  '#e8ede8',
  '#d1dbd1',
  '#b8c8b8',
  '#abc6ab', 
  '#9bb89b',
  '#8ba98b', // Cor principal
  '#7a9a7a',
  '#6a8b6a',
  '#5a7c5a',
];

const blush: MantineColorsTuple = [
  '#fdf5f5',
  '#f9e8e8',
  '#f5d1d1',
  '#eaa5a0',
  '#ef9b9b',
  '#ec8080',
  '#eaa5a0', // Cor principal
  '#e64a4a',
  '#e32f2f',
  '#e01414',
];

const neutral: MantineColorsTuple = [
  '#ffffff', // Branco
  '#f8f9fa',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#6c757d',
  '#495057',
  '#343a40',
  '#212529', // Preto
];

export const theme = createTheme({
  colors: {
    sage,
    blush,
    neutral,
  },
  primaryColor: 'sage',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    xs: '30em', // 480px
    sm: '48em', // 768px - mobile
    md: '64em', // 1024px - tablet
    lg: '74em', // 1184px - desktop
    xl: '90em', // 1440px - large desktop
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Button: {
      styles: {
        root: {
          fontWeight: 500,
          borderRadius: '0.5rem',
        },
      },
    },
    Card: {
      styles: {
        root: {
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});
