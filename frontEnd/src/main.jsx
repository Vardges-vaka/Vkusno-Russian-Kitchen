import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Must run before any component calls useTranslation, so keep it above App.
import './i18n/i18n.index.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
