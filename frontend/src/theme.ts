import { Chip, createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    // Add your color
    purple: [
      '#F4EEFF',
      '#DCD6F7',
      '#A6B1E1',
      '#424874',
      '#9FA2BE',
      '#8186AC',
      '#6F74A2',
      '#656B9E',
      '#555A8A',
      '#4B507C',
    ],
  },

  components: {
    Button: {
      defaultProps: {
        color: 'purple.3',
      },
    },
    Chip: {
      defaultProps: {
        color: 'purple.3'
      },
    }
  },
});
