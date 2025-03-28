import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import App from './components/app/App.jsx'
import './styles/styles.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
