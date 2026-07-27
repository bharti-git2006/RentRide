import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(method, path, body, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Something went wrong.");
  }

  return json.data;
}

export const useAuthStore = create(
  persist(
    (set, get) => ({

      user: null,

      login: async (email, password) => {
        // /auth/login only returns { token, role, name }, so the full
        // profile (email, phone, etc.) has to be fetched separately.
        const { token } = await request("POST", "/auth/login", {
          email,
          password,
        });

        const profile = await request("GET", "/profile", null, token);

        set({ user: { token, ...profile } });
      },

      register: async (name, email, password, phone) => {
        // /auth/signup only creates the account and returns no token,
        // so log in right after to get the user into a signed-in state.
        await request("POST", "/auth/signup", {
          name,
          email,
          password,
          phone,
        });

        await get().login(email, password);
      },

      updateProfile: (updatedUser) =>
        set((state) => ({
          user: { ...state.user, ...updatedUser },
        })),

      logout: () =>
        set({
          user: null,
        }),

    }),
    {
      name: "rentride-auth",
    }
  )
);

// Logout automatically if token becomes invalid
window.addEventListener("auth:unauthorized", () => {
  useAuthStore.getState().logout();
});

