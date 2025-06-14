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
      const user = JSON.parse(localStorage.getItem("user") || "null");

      console.log(user, "user");
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, error: null, isLoading: false }),
}));
