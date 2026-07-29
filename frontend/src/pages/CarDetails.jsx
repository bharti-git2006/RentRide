import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import CarCard from "../components/CarCard";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Fuel, 
  Settings2, 
  CarFront,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [car, setCar] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top immediately when the route/ID changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchCar = async () => {
      setLoading(true);
      try {
        const data = await get(`/cars/${id}`);
        setCar(data);

        // Fetch recommended cars
        const recommended = await get("/cars/recommended");
        setRecommendedCars(recommended);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/booking/${id}`);
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
        <div className="text-center space-y-4">
          <CarFront className="w-16 h-16 mx-auto text-base-content/30" />
          <h2 className="text-2xl font-bold">Car Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 mb-20">
      
      {/* Back Button */}
      <button
        className="btn btn-ghost btn-sm gap-2 mb-6 text-base-content/70 hover:text-base-content"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back to listings
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* Left Col: Image */}
        <div className="w-full">
          <figure className="rounded-2xl overflow-hidden shadow-2xl bg-base-200 h-64 sm:h-96 w-full">
            {car.image?.[0] ? (
              <img
                src={car.image[0]}
                alt={car.model}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <CarFront className="w-24 h-24 text-base-content/20" />
              </div>
            )}
          </figure>
        </div>

        {/* Right Col: Details */}
        <div className="flex flex-col h-full">
          
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
              {car.brand} {car.model}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="badge badge-primary badge-outline font-semibold py-3 px-4">
              {car.category}
            </span>
            <div className={`badge py-3 px-4 gap-1.5 font-medium ${car.isAvailable ? 'badge-success text-success-content' : 'badge-error text-error-content'}`}>
              {car.isAvailable ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {car.isAvailable ? "Available Now" : "Currently Unavailable"}
            </div>
          </div>

          <p className="text-base-content/70 flex items-center gap-2 mt-4 font-medium">
            <MapPin size={18} className="text-primary" />
            {car.location}
          </p>

          <div className="divider my-6"></div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
              <Users className="text-base-content/50 w-6 h-6 shrink-0" />
              <div>
                <p className="text-xs text-base-content/60 font-semibold uppercase">Seats</p>
                <p className="font-bold text-base-content leading-tight">{car.seatingCapacity}</p>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
              <Fuel className="text-base-content/50 w-6 h-6 shrink-0" />
              <div>
                <p className="text-xs text-base-content/60 font-semibold uppercase">Fuel</p>
                <p className="font-bold text-base-content leading-tight">{car.fuel}</p>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-4 flex items-center gap-3">
              <Settings2 className="text-base-content/50 w-6 h-6 shrink-0" />
              <div>
                <p className="text-xs text-base-content/60 font-semibold uppercase">Gearbox</p>
                <p className="font-bold text-base-content leading-tight">{car.transmission}</p>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Action */}
          <div className="mt-auto bg-base-100 border-2 border-base-200 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="text-base-content/60 text-sm font-semibold mb-1">Rental Price</p>
              <h2 className="text-3xl font-black text-primary flex items-baseline gap-1">
                ₹{car.pricePerDay} <span className="text-lg text-base-content/50 font-medium">/day</span>
              </h2>
            </div>

            <button
              className="btn btn-primary btn-lg w-full sm:w-auto"
              disabled={!car.isAvailable}
              onClick={handleBooking}
            >
              {car.isAvailable ? "Book This Car" : "Unavailable"}
            </button>
          </div>

        </div>
      </div>
{/* Description Section */}
      {car.description && (
        <div className="mt-12 lg:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Info className="text-primary" size={20} strokeWidth={2.5} /> 
            About this vehicle
          </h2>
          
          <div className="bg-base-200/60 rounded-3xl p-6 md:p-8 lg:p-10">
            <p className="text-base-content/80 text-lg md:text-xl leading-relaxed whitespace-pre-wrap max-w-5xl">
              {car.description}
            </p>
          </div>
        </div>
      )}

      {/* Recommended Cars */}
      {recommendedCars.length > 0 && (
        <div className="mt-16 lg:mt-20">
          <div className="divider mb-10"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
            You might also like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedCars.map((recommendedCar) => (
              <CarCard key={recommendedCar._id} car={recommendedCar} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetails;