import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import SetUpAccount from "./pages/SetUpAccount";
import IsAuthenticated from "./pages/Auth/IsAuthenticated";
import History from "./pages/History";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  { path: '/', element: <IsAuthenticated /> },
  { path: '/login', element: <Login />  },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/setup', element: <SetUpAccount /> },
  { path: '/history', element: <History /> },
  { path: '/profile', element: <Profile /> }
])


