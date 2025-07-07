"use client";

import Shots from "@/components/shots";
import { useAuthStore } from "@/store/auth";

export default function DashboardPage() {
  const { user } = useAuthStore();

  console.log(user);

  return (
    <div className="container mx-auto px-4 my-8 lg:my-20">
      <Shots />
    </div>
  );
}
