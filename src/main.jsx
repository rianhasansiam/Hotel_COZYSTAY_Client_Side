import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Contex from './Contex.jsx'






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contex>

    <RouterProvider router={Root} />
    </Contex>
  </StrictMode>,
)
