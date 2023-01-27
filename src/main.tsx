import { ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { GlobalStyles } from './config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
)
