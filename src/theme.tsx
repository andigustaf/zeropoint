import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { 
  body: `'Inter', sans-serif` ,
  heading: `'Inter', sans-serif` ,
  mono: `'Inter', sans-serif` 
}

const fontSizes = {
  base: '16px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  '2xl': '24px',
}

const breakpoints = createBreakpoints({
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px'
})

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '8px',
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  fontSizes,
  breakpoints,
})

export default theme
