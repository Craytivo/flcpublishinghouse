tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'Source Sans Pro'", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      colors: {
        flcNavy:      '#1A3A52',
        flcNavyDark:  '#0F2838',
        flcNavyLight: '#2A4A62',
        flcGold:      '#9A7B4F',
        flcGoldLight: '#B8956A',
        flcCharcoal:  '#2C2C2C',
        flcCream:     '#F5F1E8',
        flcOffWhite:  '#FAFAF8',
        flcBorder:    '#E8E6E1',
      },
      boxShadow: {
        editorial: '0 1px 2px rgba(15,40,56,0.04), 0 4px 12px rgba(15,40,56,0.06)',
        soft:      '0 2px 8px rgba(15,40,56,0.05), 0 12px 32px rgba(15,40,56,0.07)',
        elevated:  '0 4px 16px rgba(15,40,56,0.06), 0 24px 56px rgba(15,40,56,0.09)',
      },
    },
  },
};
