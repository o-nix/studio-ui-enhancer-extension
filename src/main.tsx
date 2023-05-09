import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material'

function mountChromeExtensionIntoDom(elementId: string) {
  function getElement() {
    return document.getElementById(elementId) as HTMLElement
  }

  ReactDOM.createRoot(getElement())
    .render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    )
}

export default mountChromeExtensionIntoDom
