"use client";

import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import Navbar from "../navbar";
import Footer from "../footer";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const { fetchUser, isLoading, user } = useAuthStore();

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      fetchUser();
    }
  }, [fetchUser, pathname]);

  // Only show loading for dashboard routes while checking auth
  if (isLoading && pathname.startsWith("/dashboard")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <Toaster richColors position="top-right" />

      {isDashboard && <Navbar />}
      {children}
      {isDashboard && <Footer />}
    </>
  );
}
