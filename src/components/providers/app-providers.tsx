"use client";

import React from "react";
import { Toaster } from "sonner";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
