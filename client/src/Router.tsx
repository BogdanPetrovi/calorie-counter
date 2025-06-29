import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Main from "./pages/Dashboard/Main";

const IsAuthenticated = () => {
  const isAuthenticated = !!localStorage.getItem("token")

  return isAuthenticated ? 
  <Navigate to="/dashboard" /> 
  :
  <Navigate to="/login" />
}

export const router = createBrowserRouter([
  { path: '/', element: <IsAuthenticated /> },
  { path: '/login', element: <Login />  },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Main /> }
])


