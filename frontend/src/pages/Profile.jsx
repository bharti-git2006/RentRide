import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(method, path, body) {
  const token = useAuthStore.getState().user?.token;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data.data;
}

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout, updateProfile } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const updated = await request("PUT", "/profile/update", {
        name,
        phone,
      });

      updateProfile(updated);

      toast.success("Profile Updated");
    } catch (err) {
      toast.error(err.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Profile
      </h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">

        <div className="avatar avatar-placeholder">
          <div className="bg-primary text-primary-content rounded-full w-20">
            <span className="text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-4">
          {user?.name}
        </h2>

        <p className="text-base-content/60">
          {user?.email}
        </p>

      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-5">

        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input
            type="email"
            className="input input-bordered w-full"
            value={user?.email}
            disabled
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>

          <input
            type="text"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </form>

      <button
        className="btn btn-outline btn-error w-full mt-6"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default Profile;