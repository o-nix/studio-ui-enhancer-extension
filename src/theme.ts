import createPalette from '@mui/material/styles/createPalette'
import {createTheme} from '@mui/material'

const palette = createPalette({
  primary: {
    main: '#0c2a7a',
    light: '#5a56f9',
    dark: '#00014d',
    contrastText: '#fff'
  },
  secondary: {
    main: '#ff0050',
    light: '#ff5b7c',
    dark: '#c40028',
    contrastText: '#fff'
  },
  action: {
    active: '#0c2a7a'
  },
  info: {
    main: '#2c82be'
  },
  text: {
    primary: '#0c2a7a',
    secondary: '#0c2a7a'
  }
})

const theme = createTheme({
  palette,
  typography: {
    fontFamily: 'Lato',
    fontSize: 14,
    caption: {
      lineHeight: 1.5
    }
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '4px',
          backgroundColor: palette.secondary.main
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'initial'
        }
      }
    }
  }
})

export default theme
