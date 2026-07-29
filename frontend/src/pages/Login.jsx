import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Mail, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await login(email, password);
      toast.success("Welcome Back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login Failed");
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
                Welcome Back
              </h1>
              <p className="text-base-content/60 mt-1 font-medium">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="form-control w-full">
              {/* Centered Label */}
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">Email Address</span>
              </label>
              
              {/* Centered Input with Absolute Icon */}
              <div className="relative w-full text-center">
                <Mail size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control w-full">
              {/* Centered Label */}
              <label className="label justify-center pb-2">
                <span className="label-text font-bold text-base-content/80">Password</span>
              </label>
              
              {/* Centered Input with Absolute Icon */}
              <div className="relative w-full text-center">
                <Lock size={18} className="text-base-content/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  className="input input-bordered w-full text-center focus:input-primary transition-all px-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-lg flex justify-center items-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <LogIn size={20} />
              )}
              <span>{submitting ? "Signing In..." : "Sign In"}</span>
            </button>
            
          </form>

          {/* Footer */}
          <div className="divider text-base-content/40 text-sm mt-8 mb-4">OR</div>

          <p className="text-center text-base-content/70 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-bold hover:underline transition-all"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;