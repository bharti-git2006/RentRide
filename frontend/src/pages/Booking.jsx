import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { 
  CalendarDays, 
  MapPin, 
  CarFront, 
  CheckCircle, 
  ArrowLeft, 
  Receipt 
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

const Booking = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState(""); // Added dropLocation state

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await request("GET", `/cars/${id}`);
        setCar(data);
        setPickupLocation(data.location);
        setDropLocation(data.location); // Default drop location to pickup location
      } catch {
        toast.error("Failed to load car.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

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

    if (!pickupDate || !returnDate || !pickupLocation || !dropLocation) {
      return toast.error("Please fill all fields.");
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      return toast.error("Return date must be after pickup date.");
    }

    // Safely extract the owner ID
    const ownerId = car?.owner?._id || car?.owner;

    // Failsafe: Prevent submission if the car has no owner attached
    if (!ownerId) {
      console.error("Car object is missing owner data:", car);
      return toast.error("Error: Car owner details are missing from the database.");
    }

    setSubmitting(true);

    try {
      const payload = {
        car: id,
        pickupDate,
        returnDate,
        pickupLocation,
        dropLocation,
        owner: ownerId, 
      };

      // DEBUG: Check your browser console to verify this payload has a valid 'owner' string
      console.log("Sending booking payload:", payload); 

      const data = await request("POST", "/bookings", payload);

      setBooking(data);
      toast.success("Booking Confirmed!");
    } catch (err) {
      toast.error(err.message || "Booking failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // --- Not Found State ---
  if (!car) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
          <div className="card-body items-center">
            <CarFront className="w-16 h-16 text-base-content/30 mb-4" />
            <h2 className="card-title text-2xl font-bold">Car Not Found</h2>
            <p className="text-base-content/70">The vehicle you are trying to book is unavailable or doesn't exist.</p>
            <div className="card-actions mt-4">
              <Link to="/cars" className="btn btn-primary">
                Browse Available Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Success State ---
  if (booking) {
    return (
      <div className="max-w-md mx-auto mt-12 px-4 mb-20">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body items-center text-center">
            <CheckCircle className="w-20 h-20 text-success mb-2" />
            <h1 className="text-3xl font-black text-base-content">
              Booking Confirmed!
            </h1>
            <p className="text-base-content/70 mt-2">
              Your <span className="font-bold text-base-content">{car.brand} {car.model}</span> is ready for you.
            </p>

            <div className="bg-base-200 rounded-box w-full p-4 mt-6 text-left space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-base-300">
                <span className="text-base-content/70 flex items-center gap-2">
                  <CalendarDays size={16} /> Pickup
                </span>
                <span className="font-semibold">{new Date(booking.pickupDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-base-300">
                <span className="text-base-content/70 flex items-center gap-2">
                  <CalendarDays size={16} /> Return
                </span>
                <span className="font-semibold">{new Date(booking.returnDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-base-300">
                <span className="text-base-content/70 flex items-center gap-2">
                  <MapPin size={16} /> Pickup Location
                </span>
                <span className="font-semibold truncate max-w-[150px]">{booking.pickupLocation}</span>
              </div>
              {/* Added Drop Location to Summary */}
              <div className="flex justify-between items-center pb-2 border-b border-base-300">
                <span className="text-base-content/70 flex items-center gap-2">
                  <MapPin size={16} /> Drop Location
                </span>
                <span className="font-semibold truncate max-w-[150px]">{booking.dropLocation}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total Paid</span>
                <span className="text-xl font-black text-primary">${booking.totalPrice}</span>
              </div>
            </div>

            <div className="card-actions w-full mt-6">
              <Link to="/bookings" className="btn btn-primary w-full">
                View My Bookings
              </Link>
              <Link to="/" className="btn btn-ghost w-full">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Booking Form ---
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 mb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => window.history.back()} className="btn btn-circle btn-ghost btn-sm">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            Checkout
          </h1>
          <p className="text-base-content/70 text-sm mt-1">Complete your booking details below.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Col: Booking Form */}
        <div className="lg:col-span-3 card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">Trip Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid md:grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <CalendarDays size={16} className="text-base-content/50"/> Pickup Date
                    </span>
                  </div>
                  <input
                    type="date"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    min={new Date().toISOString().split("T")[0]}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <CalendarDays size={16} className="text-base-content/50"/> Return Date
                    </span>
                  </div>
                  <input
                    type="date"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    min={pickupDate || new Date().toISOString().split("T")[0]}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-base-content/50" /> Pickup Location
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter pickup address or airport"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </label>

                {/* Added Drop Location Field */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MapPin size={16} className="text-base-content/50" /> Drop Location
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter drop-off address"
                    className="input input-bordered w-full focus:input-primary transition-colors"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                  />
                </label>
              </div>

              <div className="divider my-2"></div>

              <button
                type="submit"
                className="btn btn-primary w-full text-lg"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <CheckCircle size={20} />
                )}
                {submitting ? "Confirming..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Booking Summary */}
        <div className="lg:col-span-2 card bg-base-100 shadow-xl border border-base-200 overflow-hidden sticky top-24">
          <figure className="h-52 bg-base-200">
            {car.image?.[0] ? (
              <img
                src={car.image[0]}
                alt={car.model}
                className="w-full h-full object-cover"
              />
            ) : (
              <CarFront className="w-20 h-20 text-base-content/20" />
            )}
          </figure>
          
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-2xl font-bold">
                  {car.brand} {car.model}
                </h2>
                <span className="badge badge-primary badge-outline mt-2">{car.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-base-content/70 mt-4 text-sm">
              <MapPin size={16} />
              <span>{car.location}</span>
            </div>

            <div className="divider mb-2"></div>

            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Receipt size={18} /> Price Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/70">Price per day</span>
                <span className="font-medium">₹{car.pricePerDay}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-base-content/70">Duration</span>
                <span className="font-medium">{days} {days === 1 ? 'day' : 'days'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-base-content/70">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-base-content/70">Service Fee</span>
                <span className="font-medium">${days > 0 ? serviceFee : 0}</span>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-black text-primary">₹{total}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Booking;