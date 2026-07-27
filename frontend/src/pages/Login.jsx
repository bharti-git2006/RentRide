import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
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
    <div className="min-h-screen flex justify-center items-center px-4">

      <div className="card bg-base-100 shadow-xl w-full max-w-md">

        <div className="card-body">

          <div className="flex flex-col items-center mb-6">

            <div className="bg-primary text-primary-content p-4 rounded-full">
              <Car size={30} />
            </div>

            <h1 className="text-3xl font-bold mt-4">
              Login
            </h1>

            <p className="text-base-content/60 mt-2">
              Login to continue
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-5">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-primary font-semibold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;