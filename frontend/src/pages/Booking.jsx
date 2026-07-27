import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const Booking = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await request("GET", `/cars/${id}`);
        setCar(data);
        setPickupLocation(data.location);
      } catch{
        toast.error("Failed to load car.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, []);

  const days =
    pickupDate && returnDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(returnDate) - new Date(pickupDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const serviceFee = 15;
  const subtotal = car ? days * car.pricePerDay : 0;
  const total = subtotal + (days > 0 ? serviceFee : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate || !pickupLocation) {
      return toast.error("Please fill all fields.");
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      return toast.error("Return date must be after pickup date.");
    }

    setSubmitting(true);

    try {
      const data = await request("POST", "/bookings", {
        car: id,
        pickupDate,
        returnDate,
        pickupLocation,
      });

      setBooking(data);
      toast.success("Booking Confirmed!");
    } catch (err) {
      toast.error(err.message || "Booking failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">Car Not Found</h2>

        <Link to="/cars" className="btn btn-primary mt-5">
          Browse Cars
        </Link>
      </div>
    );
  }

  if (booking) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center">

        <h1 className="text-4xl font-bold text-success">
          Booking Successful 🎉
        </h1>

        <p className="mt-4">
          Your <strong>{car.brand} {car.model}</strong> has been booked.
        </p>

        <div className="card bg-base-100 mt-8 p-5 text-left">

          <p>
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

          <p className="text-xl font-bold mt-4">
            Total Paid: ${booking.totalPrice}
          </p>

        </div>

        <Link to="/bookings" className="btn btn-primary mt-6">
          View My Bookings
        </Link>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Book {car.brand} {car.model}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Booking Form */}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="label">
              <span className="label-text">Pickup Date</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              min={new Date().toISOString().split("T")[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Return Date</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Pickup Location</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>

        </form>

        {/* Booking Summary */}

        <div className="card bg-base-200 p-6">

          <img
            src={car.image?.[0]}
            alt={car.model}
            className="rounded-lg h-52 object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            {car.brand} {car.model}
          </h2>

          <p className="mt-2">
            {car.category}
          </p>

          <p>
            {car.location}
          </p>

          <div className="divider"></div>

          <div className="space-y-2">

            <div className="flex justify-between">
              <span>Price / Day</span>
              <span>${car.pricePerDay}</span>
            </div>

            <div className="flex justify-between">
              <span>Days</span>
              <span>{days}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>${days > 0 ? serviceFee : 0}</span>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Booking;