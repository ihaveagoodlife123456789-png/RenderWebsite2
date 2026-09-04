import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { FrontPage } from './Front.jsx'
import { FormPage } from './form.jsx'
import { UsersPage } from './users.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />,
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
