import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.user?.token);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Changed from /admin/bookings to /bookings
        const response = await fetch(`${BASE_URL}/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        // Fallback to support both { data: [...] } and [...] response structures
        setBookings(data.data || data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  if (loading) return <div className="loading loading-spinner loading-lg text-primary"></div>;

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Manage Bookings</h1>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td className="font-mono text-xs">{booking._id.substring(0, 8)}...</td>
                <td>{booking.user?.name || 'Unknown'}</td>
                <td>{booking.car?.brand || 'Unknown'} {booking.car?.model || ''}</td>
                <td className="font-bold text-primary">${booking.totalPrice}</td>
                <td>
                  <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline btn-success">Approve</button>
                  <button className="btn btn-sm btn-outline btn-error">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;