import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";
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
    <div className="min-h-screen flex justify-center items-center px-4">

      <div className="card bg-base-100 shadow-xl w-full max-w-md">

        <div className="card-body">

          <div className="flex flex-col items-center mb-6">

            <div className="bg-primary text-primary-content p-4 rounded-full">
              <Car size={30} />
            </div>

            <h1 className="text-3xl font-bold mt-4">
              Register
            </h1>

            <p className="text-base-content/60 mt-2">
              Create your account
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
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
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-5">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-primary font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;