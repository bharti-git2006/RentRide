import { Link, NavLink, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/cars">Cars</NavLink>
      </li>

      <li>
        <NavLink to="/bookings">Bookings</NavLink>
      </li>

      {user?.role === "admin" && (
        <li>
          <NavLink to="/admin">Admin Panel</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8 sticky top-0 z-50">

      {/* Left */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow z-100"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold"
        >
          <Car className="text-primary" size={24} />
          RENT<span className="text-primary">RIDE</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navLinks}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">

        {user ? (
          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar avatar-placeholder"
            >
              <div className="bg-primary text-primary-content w-10 rounded-full">
                <span className="font-semibold">
                  {user.name?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 bg-base-100 rounded-box shadow z-[100]"
            >
              <li className="menu-title">
                <span>{user.name.toUpperCase()}</span>
              </li>

              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/bookings">My Bookings</Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin Panel</Link>
                </li>
              )}

              <div className="divider my-1"></div>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;