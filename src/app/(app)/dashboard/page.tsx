"use client";

import Navbar from "@/components/navbar";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const { user } = useAuthStore();

  console.log(user);

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.username || "User"}
        </h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
