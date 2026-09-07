import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { FullPage } from './index.jsx'
import { FormPage } from './form.jsx'
import { UsersPage } from './users.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullPage />,
  },
  {
    path: '/form',
    element: <FormPage />,
  },
  {
    path: '/users',
    element: <UsersPage />,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
