import { AppProviders } from "@/components/providers/app-providers";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
