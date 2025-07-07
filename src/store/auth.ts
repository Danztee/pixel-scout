import { create } from "zustand";

interface User {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  fetchUser: async () => {
    try {
      set({ isLoading: true });

      // First try to get user from server to validate token
      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.user;

        // Update localStorage with fresh data
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isLoading: false, error: null });
      } else {
        // Server token invalid, clear localStorage and user state
        localStorage.removeItem("user");
        set({ user: null, isLoading: false, error: null });
      }
    } catch (error) {
      // Fallback to localStorage if server is unreachable
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        set({ user, isLoading: false, error: null });
      } catch (parseError) {
        localStorage.removeItem("user");
        set({
          user: null,
          error: error instanceof Error ? error.message : "An error occurred",
          isLoading: false,
        });
      }
    }
  },

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, error: null, isLoading: false }),
}));
