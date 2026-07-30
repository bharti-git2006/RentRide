import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { 
  CalendarDays, 
  MapPin, 
  CarFront, 
  History, 
  XCircle,
  ArrowRight
} from "lucide-react";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(method, path, body) {
  const token = useAuthStore.getState().user?.token;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await request("GET", "/bookings");
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await request("PUT", `/bookings/${id}/cancel`);
      toast.success("Booking Cancelled");
      fetchBookings();
    } catch (err) {
      toast.error(err.message || "Cancellation failed.");
    }
  };

  // Helper to colorize badges based on status
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase() || "";
    if (s === "confirmed") return "badge-success badge-outline";
    if (s === "pending") return "badge-warning badge-outline";
    if (s === "cancelled") return "badge-error badge-outline";
    if (s === "completed") return "badge-info badge-outline";
    return "badge-ghost";
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 mb-20">
      
      <div className="flex items-center gap-3 mb-8">
        <History className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-black tracking-tight">
          My Bookings
        </h1>
      </div>

      {/* --- Empty State --- */}
      {bookings.length === 0 ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="card bg-base-100 shadow-xl border border-base-200 max-w-md w-full text-center">
            <div className="card-body items-center py-12">
              <CarFront className="w-16 h-16 text-base-content/20 mb-4" />
              <h2 className="card-title text-2xl font-bold">No bookings yet</h2>
              <p className="text-base-content/70">You haven't rented any cars yet. Start your journey today!</p>
              <div className="card-actions mt-6">
                <Link to="/cars" className="btn btn-primary">
                  Browse Available Cars <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        
        /* --- Bookings List --- */
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card sm:card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow border border-base-200 overflow-hidden"
            >
              
              {/* Car Image (Left on Desktop, Top on Mobile) */}
              <figure className="w-full sm:w-56 h-48 sm:h-auto bg-base-200 shrink-0">
                {booking.car?.image?.[0] ? (
                  <img
                    src={booking.car.image[0]}
                    alt={booking.car.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CarFront className="w-16 h-16 text-base-content/20" />
                )}
              </figure>

              {/* Card Body */}
              <div className="card-body p-5 md:p-6 flex flex-col md:flex-row gap-6 w-full">
                
                {/* Details Section */}
                <div className="flex-1 space-y-4">
                  
                  <div className="flex justify-between items-start gap-4">
                    <Link
                      to={`/cars/${booking.car?._id}`}
                      className="text-2xl font-bold hover:text-primary transition-colors line-clamp-1"
                    >
                      {booking.car?.brand} {booking.car?.model}
                    </Link>
                    <span className={`badge font-semibold shrink-0 ${getStatusBadge(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-base-content/80">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-base-content/50" />
                      <span>
                        <strong className="text-base-content">Pickup:</strong>{" "}
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-base-content/50" />
                      <span>
                        <strong className="text-base-content">Return:</strong>{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin size={16} className="text-base-content/50 shrink-0" />
                      <span className="truncate">
                        <strong className="text-base-content">Location:</strong> {booking.pickupLocation}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divider md:divider-horizontal my-0"></div>

                {/* Pricing & Actions Section */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end md:w-32 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-base-content/60 font-semibold uppercase tracking-wider">Total Paid</span>
                    <h2 className="text-2xl font-black text-primary">
                      ₹{booking.totalPrice}
                    </h2>
                  </div>

                  {["Pending", "Confirmed"].includes(booking.bookingStatus) && (
                    <button
                      className="btn btn-error btn-outline btn-sm sm:btn-md mt-0 md:mt-4 w-full md:w-auto"
                      onClick={() => handleCancel(booking._id)}
                    >
                      <XCircle size={18} />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;