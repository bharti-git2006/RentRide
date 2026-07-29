import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.user?.token);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Changed from /admin/cars to /cars
        const response = await fetch(`${BASE_URL}/cars`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        // Fallback to support both { data: [...] } and [...] response structures
        setCars(data.data || data || []);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [token]);

  if (loading) return <div className="loading loading-spinner loading-lg text-primary"></div>;

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Manage Cars</h1>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Brand & Model</th>
              <th>Category</th>
              <th>Price/Day</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id}>
                <td className="font-semibold">{car.brand} {car.model}</td>
                <td>{car.category}</td>
                <td>${car.pricePerDay}</td>
                <td>
                  <span className={`badge ${car.isAvailable ? 'badge-success' : 'badge-error'}`}>
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline btn-info">Edit</button>
                  <button className="btn btn-sm btn-outline btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;