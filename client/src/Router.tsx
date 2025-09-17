import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useUser } from "./utils/userQuery";
import axios from "axios";
import SetUpAccount from "./pages/SetUp/SetUpAccount";
import Loader from "./components/general/Loader";

const IsAuthenticated = () => {
  const { data: user, isPending, isError, error } = useUser()
   
  if(isPending) return <Loader />

  if(isError && axios.isAxiosError(error) && error.status === 401)
    return <Navigate to={'/login'} />

   if(user)
    return <Navigate to={'/dashboard'} />
}

export const router = createBrowserRouter([
  { path: '/', element: <IsAuthenticated /> },
  { path: '/login', element: <Login />  },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/setup', element: <SetUpAccount /> }
])


