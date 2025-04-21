import React from "react";
import WebsiteProviders from "@/components/providers/website-providers";
import Footer from "@/components/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebsiteProviders>
      {children}
      <Footer />
    </WebsiteProviders>
  );
}
