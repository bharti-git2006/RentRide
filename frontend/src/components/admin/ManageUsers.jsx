import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.user?.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/all-users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  if (loading) return <div className="loading loading-spinner loading-lg text-primary"></div>;

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Manage Users</h1>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-box">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="font-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline btn-info">Edit</button>
                  <button className="btn btn-sm btn-outline btn-error">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;