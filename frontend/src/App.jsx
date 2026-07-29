import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./components/MainLayout";
import AdminLayout from "./components/admin/AdminLayout";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Components
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageCars from "./components/admin/ManageCars";
import ManageUsers from "./components/admin/ManageUsers";
import ManageBookings from "./components/admin/ManageBookings";


const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Public & User Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/cars" element={<PublicRoute><Cars /></PublicRoute>} />
          <Route path="/cars/:id" element={<PublicRoute><CarDetails /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          
          <Route path="*" element={<PublicRoute><NotFound /></PublicRoute>} />
        </Route>

       {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;