import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

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

  if (loading) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center mt-20">

          <p>No bookings found.</p>

          <Link to="/cars" className="btn btn-primary mt-5">
            Browse Cars
          </Link>

        </div>
      ) : (
        <div className="space-y-5">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card bg-base-200 shadow p-5"
            >
              <div className="flex gap-5">

                <img
                  src={booking.car?.image?.[0]}
                  alt={booking.car?.model}
                  className="w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <Link
                    to={`/cars/${booking.car?._id}`}
                    className="text-xl font-bold hover:text-primary"
                  >
                    {booking.car?.brand} {booking.car?.model}
                  </Link>

                  <p className="mt-2">
                    <strong>Pickup:</strong>{" "}
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Return:</strong>{" "}
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Location:</strong> {booking.pickupLocation}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge badge-primary">
                      {booking.bookingStatus}
                    </span>
                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-2xl font-bold text-primary">
                    ${booking.totalPrice}
                  </h2>

                  {["Pending", "Confirmed"].includes(booking.bookingStatus) && (
                    <button
                      className="btn btn-error btn-sm mt-4"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
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