import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, cars: 0, bookings: 0, trips: 0 });
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.user?.token);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
            setStats(data.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <div className="loading loading-spinner loading-lg text-primary"></div>;

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-xl border-t-4 border-primary">
          <div className="card-body">
            <h2 className="text-base-content/60 text-sm uppercase font-bold">Total Users</h2>
            <p className="text-4xl font-black">{stats.users}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border-t-4 border-secondary">
          <div className="card-body">
            <h2 className="text-base-content/60 text-sm uppercase font-bold">Total Cars</h2>
            <p className="text-4xl font-black">{stats.cars}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border-t-4 border-accent">
          <div className="card-body">
            <h2 className="text-base-content/60 text-sm uppercase font-bold">Active Bookings</h2>
            <p className="text-4xl font-black">{stats.bookings}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl border-t-4 border-info">
          <div className="card-body">
            <h2 className="text-base-content/60 text-sm uppercase font-bold">Total Trips</h2>
            <p className="text-4xl font-black">{stats.trips}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;