import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import Map from "../components/Map";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function get(path, params) {
  const query = params
    ? `?${new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([, value]) => value))
      ).toString()}`
    : "";

  const res = await fetch(`${BASE_URL}${path}${query}`);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

const types = ["Hatchback", "Sedan", "SUV", "Luxury", "Sports"];

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = {};

        if (location) params.location = location;
        if (category) params.category = category;

        const data = await get("/cars", params);
        setCars(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCars();
  }, [location, category]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-base-content">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Browse Cars
        </h1>
        <p className="text-base-content/70">
          Find and book the perfect vehicle for your next trip.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-base-200/50 p-4 rounded-box mb-8 border border-base-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="form-control w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="📍 Enter location..."
              className="input input-bordered w-full bg-base-100 focus:input-primary transition-colors"
              value={location}
              onChange={(e) => updateFilter("location", e.target.value)}
            />
          </div>

          <div className="form-control w-full sm:max-w-xs">
            <select
              className="select select-bordered w-full bg-base-100 focus:select-primary transition-colors"
              value={category}
              onChange={(e) => updateFilter("category", e.target.value)}
            >
              <option value="">All Vehicle Types</option>
              {types.map((carType) => (
                <option key={carType} value={carType}>
                  {carType}
                </option>
              ))}
            </select>
          </div>

          {/* Optional: Clear filters button if filters are active */}
          {(location || category) && (
            <button 
              onClick={clearFilters}
              className="btn btn-ghost text-base-content/60 hover:text-base-content sm:ml-auto"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Map Prototype */}
      <div className="mb-10 rounded-box overflow-hidden border border-base-300 shadow-sm z-0 relative">
        <Map cars={cars} />
      </div>

      {/* Cars Grid / Empty State */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">
          {cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"} Available
        </h2>

        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-base-200/30 rounded-box border-2 border-base-300 border-dashed">
            <div className="text-4xl mb-4 opacity-50">🚗</div>
            <h3 className="text-xl font-bold mb-2">No cars found</h3>
            <p className="text-base-content/60 max-w-md">
              We couldn't find any vehicles matching your current search. Try adjusting your location or category filters.
            </p>
            {(location || category) && (
              <button onClick={clearFilters} className="btn btn-primary mt-6">
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Cars;