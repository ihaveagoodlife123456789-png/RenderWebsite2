import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { FullPage } from './index.jsx'
import { FormPage } from './form.jsx'
import { UsersPage } from './users.jsx'
import { SignIn } from './signIn.jsx'
import { Login } from './login.jsx'
import { GetUserProfile } from './profiles.jsx'
import { Dashboard } from './dashboard.jsx'
import { PaymentPage } from './stripe.jsx'
import { Element } from './stripe.jsx'

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
  },
  {
    path: '/signIn',
    element: <SignIn />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <GetUserProfile />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/payment',
    element: <PaymentPage />
  },
  {
    path: '/auth/payment/method',
    element: <Element />
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
