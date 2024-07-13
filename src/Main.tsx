import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import GlobalError from './GlobalError'
import { mainRouter } from './Routes'

import './Main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={GlobalError}>
      <RouterProvider router={mainRouter} />
    </ErrorBoundary>
  </React.StrictMode>,
)
