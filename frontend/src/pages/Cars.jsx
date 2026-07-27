import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function get(path, params) {
  const query = params
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, value]) => value)
        )
      ).toString()}`
    : "";

  const res = await fetch(`${BASE_URL}${path}${query}`);
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

// Matches the "category" enum on the backend Car model
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

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Browse Cars
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Location"
          className="input input-bordered"
          value={location}
          onChange={(e) => updateFilter("location", e.target.value)}
        />

        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="">All Types</option>

          {types.map((carType) => (
            <option key={carType} value={carType}>
              {carType}
            </option>
          ))}
        </select>

      </div>

      {/* Cars */}
      {cars.length === 0 ? (
        <p>No Cars Found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Cars;