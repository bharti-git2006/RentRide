import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  Car, 
  Menu, 
  User, 
  CalendarDays, 
  ShieldAlert, 
  LogOut 
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ThemeToggle from "./ThemeToggle"; // Make sure the path is correct

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Helper function to handle active route styling with DaisyUI
  const getNavLinkClass = ({ isActive }) => 
    isActive ? "active font-semibold" : "hover:bg-base-200 transition-colors";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/cars" className={getNavLinkClass}>Cars</NavLink>
      </li>
      <li>
        <NavLink to="/bookings" className={getNavLinkClass}>Bookings</NavLink>
      </li>
      {user?.role === "admin" && (
        <li>
          <NavLink to="/admin" className={getNavLinkClass}>Admin Panel</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-200 shadow-sm px-4 lg:px-8 sticky top-0 z-50 transition-all">
      
      {/* Left */}
      <div className="navbar-start">
        
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-1">
            <Menu className="h-5 w-5" />
          </div>

          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 border border-base-200 rounded-box mt-3 w-56 p-2 shadow-xl z-[1]"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost hover:bg-transparent text-xl md:text-2xl font-black gap-2 px-1 tracking-tight"
        >
          <Car className="text-primary" size={28} strokeWidth={2.5} />
          <span>RENT<span className="text-primary">RIDE</span></span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1 text-base-content/90 font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-2 md:gap-4">
        
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder ring ring-transparent hover:ring-primary/30 transition-all"
            >
              <div className="bg-primary text-primary-content w-10 rounded-full">
                <span className="text-lg font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 bg-base-100 border border-base-200 rounded-box shadow-xl z-[1]"
            >
              <li className="menu-title px-4 py-2">
                <span className="text-xs opacity-70 tracking-wide uppercase">Account</span>
                <span className="block text-sm font-semibold text-base-content mt-0.5 truncate">
                  {user.name}
                </span>
              </li>
              
              <div className="divider my-0"></div>

              <li>
                <Link to="/profile" className="py-2.5">
                  <User size={16} className="opacity-70" />
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/bookings" className="py-2.5">
                  <CalendarDays size={16} className="opacity-70" />
                  My Bookings
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link to="/admin" className="py-2.5">
                    <ShieldAlert size={16} className="opacity-70" />
                    Admin Panel
                  </Link>
                </li>
              )}

              <div className="divider my-0"></div>

              <li>
                <button 
                  onClick={handleLogout} 
                  className="py-2.5 text-error hover:bg-error/10 hover:text-error focus:text-error"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm md:btn-md font-semibold"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm md:btn-md font-semibold"
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