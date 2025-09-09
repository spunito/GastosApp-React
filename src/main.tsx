import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GastosApp } from './GastosApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GastosApp />
  </StrictMode>,
)
