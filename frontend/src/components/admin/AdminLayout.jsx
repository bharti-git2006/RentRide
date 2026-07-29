import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="flex h-screen bg-base-200">
      <aside className="w-64 bg-neutral text-neutral-content flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-neutral-focus">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block py-2 px-4 rounded hover:bg-neutral-focus">Dashboard</Link>
          <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-neutral-focus">Manage Users</Link>
          <Link to="/admin/cars" className="block py-2 px-4 rounded hover:bg-neutral-focus">Manage Cars</Link>
          <Link to="/admin/bookings" className="block py-2 px-4 rounded hover:bg-neutral-focus">Manage Bookings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;