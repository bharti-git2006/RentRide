import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Home = () => {
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await get("/cars/popular");
        setCars(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/cars?location=${location}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold">
          Rent Your Dream Car
        </h1>

        <p className="mt-4 text-base-content/60">
          Find the best cars at the best prices.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-3 mt-6"
        >
          <input
            type="text"
            placeholder="Enter Location"
            className="input input-bordered w-72"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Popular Cars */}
      <div className="mt-10">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold">
            Popular Cars
          </h2>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate("/cars")}
          >
            View All
          </button>
        </div>

        {cars.length === 0 ? (
          <p>No Cars Available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;