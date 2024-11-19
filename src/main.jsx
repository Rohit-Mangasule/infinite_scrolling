import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App'
import GridExample from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GridExample />
  </StrictMode>,
)
