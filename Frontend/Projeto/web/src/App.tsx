
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './main.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
