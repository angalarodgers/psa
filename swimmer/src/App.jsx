import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Sidebar from "./constants/sidebar/Sidebar";
import Navbar from "./constants/navbar/Navbar";
import Footer from "./constants/footer/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Trainers from "./pages/trainers/Trainers";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Otp from "./pages/otp/Otp";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Schedules from "./pages/schedules/Schedules";
import Swimmers from "./pages/swimmers/Swimmers";
import Payments from "./pages/payments/Payments";
import Calendar from "./pages/calendar/Calendar";
import TermsAndConditions from "./pages/register/TermsAndConditions";

function App() {
  const [count, setCount] = useState(0);

  const currentUser = true;

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Sidebar />
          <div className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <Navbar />
            <div className="container-fluid py-4">
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/schedules",
          element: <Schedules />,
        },
        {
          path: "/trainers",
          element: <Trainers />,
        },
        {
          path: "/swimmers",
          element: <Swimmers />,
        },
        {
          path: "/payments",
          element: <Payments />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/psak-terms-of-service",
      element: <TermsAndConditions />,
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
