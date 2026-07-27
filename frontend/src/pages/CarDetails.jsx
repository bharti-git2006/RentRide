import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import CarCard from "../components/CarCard";

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
    const fetchCar = async () => {
      try {
        const data = await get(`/cars/${id}`);
        setCar(data);

        // The backend has no per-car "similar cars" route, so we show
        // its general recommended-cars list instead.
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

  if (loading) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <button
        className="btn btn-outline btn-sm mb-5"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Image */}
        <img
          src={car.image?.[0]}
          alt={car.model}
          className="rounded-lg w-full h-80 object-cover"
        />

        {/* Details */}
        <div>

          <h1 className="text-4xl font-bold">
            {car.brand} {car.model}
          </h1>

          <p className="text-base-content/60 mt-2">
            {car.location}
          </p>

          <p className="mt-3">
            <strong>Type:</strong> {car.category}
          </p>

          <p>
            <strong>Seats:</strong> {car.seatingCapacity}
          </p>

          <p>
            <strong>Fuel:</strong> {car.fuel}
          </p>

          <p>
            <strong>Gearbox:</strong> {car.transmission}
          </p>

          <h2 className="text-3xl font-bold text-primary mt-6">
            ${car.pricePerDay}/day
          </h2>

          <button
            className="btn btn-primary mt-5"
            disabled={!car.isAvailable}
            onClick={handleBooking}
          >
            {car.isAvailable ? "Book Now" : "Unavailable"}
          </button>

        </div>

      </div>

      {/* Description */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Description
        </h2>

        <p className="mt-3">
          {car.description}
        </p>

      </div>

      {/* Recommended Cars */}
      {recommendedCars.length > 0 && (
        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Recommended Cars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default CarDetails;