import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import SetUpAccount from "./pages/SetUp/SetUpAccount";
import IsAuthenticated from "./pages/Auth/IsAuthenticated";

export const router = createBrowserRouter([
  { path: '/', element: <IsAuthenticated /> },
  { path: '/login', element: <Login />  },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/setup', element: <SetUpAccount /> }
])


