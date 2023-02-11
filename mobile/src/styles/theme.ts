import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    Oswald: {
      700: {
        normal: 'Oswald-Bold',
      },
      600: {
        normal: 'Oswald-SemiBold',
      },
      400: {
        normal: 'Oswald-Regular',
      },
    },
    Raleway: {
      700: {
        normal: 'Raleway-Bold',
      },
      600: {
        normal: 'Raleway-SemiBold',
      },
      500: {
        normal: 'Raleway-Medium',
      },
      400: {
        normal: 'Raleway-Regular',
      },
      300: {
        normal: 'Raleway-Thin',
      },
    },
  },
  fonts: {
    heading: 'Oswald',
    body: 'Raleway',
    mono: 'Raleway',
  },
  colors: {
    primary: {
      '50': '#fff4ec',
      '100': '#ffdcc4',
      '200': '#ffc59c',
      '300': '#ffae74',
      '400': '#ff984e',
      '500': '#f98a3b',
      '600': '#f17e2b',
      '700': '#e9711c',
      '800': '#d1681c',
      '900': '#b65e20',
    },
    secondary: {
      '50': '#ecf7ff',
      '100': '#c4e6ff',
      '200': '#9cd6ff',
      '300': '#74c5ff',
      '400': '#4eb5ff',
      '500': '#3baaf9',
      '600': '#2b9ff1',
      '700': '#1c93e9',
      '800': '#1c86d1',
      '900': '#2077b6',
    },
  },
});
