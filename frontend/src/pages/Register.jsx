import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    setSubmitting(true);

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.phone
      );

      toast.success("Account Created!");

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 py-12">
      
      <div className="card bg-base-100 shadow-2xl border border-base-200 w-full max-w-md text-center">
        
        <div className="card-body p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8 space-y-3">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
              <Car size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Create Account
              </h1>
              <p className="text-base-content/60 mt-1 font-medium">
                Join us to start booking cars
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="form-control w-full">
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">Full Name</span>
              </label>
              
              <div className="relative w-full text-center">
                <User size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">Email Address</span>
              </label>
              
              <div className="relative w-full text-center">
                <Mail size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">
                  Phone Number <span className="font-normal text-base-content/50 ml-1">(Optional)</span>
                </span>
              </label>
              
              <div className="relative w-full text-center">
                <Phone size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="+91 0123456789"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">Password</span>
              </label>
              
              <div className="relative w-full text-center">
                <Lock size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-6 text-lg flex justify-center items-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <UserPlus size={20} />
              )}
              <span>{submitting ? "Creating..." : "Create Account"}</span>
            </button>
            
          </form>

          {/* Footer */}
          <div className="divider text-base-content/40 text-sm mt-8 mb-4">OR</div>

          <p className="text-center text-base-content/70 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline transition-all"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;