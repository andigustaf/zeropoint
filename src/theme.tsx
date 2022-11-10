import { extendTheme } from '@chakra-ui/react'
import { StyleConfig } from '@chakra-ui/theme-tools'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

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

const breakpoints = {
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px'
}

const button: StyleConfig = {
  baseStyle: {
    fontWeight: 'regular',
    borderRadius: '0.5rem',
  },
  sizes: {
    xs: {
      h: '32px',
      fontSize: 'xs',
      px: '16px',
    },
    sm: {
      h: '40px',
      fontSize: 'sm',
      px: '16px',
    },
    md: {
      h: '48px',
      fontSize: 'md',
      px: '16px',
    },
    lg: {
      h: '56px',
      fontSize: 'lg',
      px: '16px',
    },
  },
  variants: {
    solid: {
      bg: 'primary.50',
      color: 'white',
      _hover: {
        color: 'white',
        bg: 'primary.60',
      },
      _active: {
        color: 'white',
        bg: 'primary.60',
      },
    },
    outline: {
      bg: 'transparent',
      color: 'primary.50',
      borderColor: 'primary.50',
      _hover: {
        bg: 'transparent',
        color: 'primary.50',
        borderColor: 'primary.50',
      },
      _active: {
        bg: 'transparent',
        color: 'primary.50',
        borderColor: 'primary.50',
      },
    },
    tersier: {
      bg: 'slate-background.20',
      color: 'basic.60',
      _hover: {
        bg: 'slate-background.20',
        color: 'basic.60',
      },
      _active: {
        bg: 'slate-background.20',
        color: 'basic.60',
      },
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};

const input = defineMultiStyleConfig({
  variants: {
    outline: {
      field: {
        bg: 'white',
        fontSize: '16px',
        _focus: {
          borderColor: 'primary.50'
        },
        _disabled: {
          bg: 'basic.20'
        }
      },
    },
  }
})

const theme = extendTheme({
  components: {
    Button: button,
    Input: input,
  },
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
    primary: {
      5: '#1155CC1A',
      10: "#EBF2FF",
      20: "#AFCCFF",
      30: "#74A6FF",
      40: "#3880FF",
      50: "#1155CC",
      60: "#003288",
    },
    basic: {
      10: "#F6F6F7",
      20: "#ECF1F5",
      30: "#BEC5CC",
      40: "#939BA3",
      50: "#6B737B",
      60: "#212529",
    },
    'slate-background': {
      20: '#F4F4F4',
      50: '#FFFFFF'
    },
    'slate-disabled': '#AAAAAA',
    black: '#16161D',
  },
  fonts,
  fontSizes,
  breakpoints,
})

export default theme