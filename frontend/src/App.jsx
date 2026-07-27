import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Toaster position="top-center" />

      <Navbar />

      <main className="flex-1">

        <Routes>

          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

          <Route path="/cars" element={<PublicRoute><Cars/></PublicRoute>} />

          <Route path="/cars/:id" element={<PublicRoute><CarDetails /></PublicRoute>} />

          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          

          <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>} />

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route path="*" element={<PublicRoute><NotFound /></PublicRoute>} />

        </Routes>

      </main>

      <Footer />

    </div>
  );
};

export default App;