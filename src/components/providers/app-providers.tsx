"use client";

import { useAuthStore } from "@/store/auth";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "sonner";

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

  if (isLoading && !user && !pathname.startsWith("/auth")) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={50} />
      </div>
    );
  }

  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
