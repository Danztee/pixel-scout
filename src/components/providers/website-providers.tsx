"use client";

import React from "react";
import CookieConsent from "../cookie-consent";
import { ReactLenis } from "lenis/react";

type WebsiteProvidersProps = {
  children: React.ReactNode;
};

const WebsiteProviders: React.FC<WebsiteProvidersProps> = ({ children }) => {
  return (
    <>
      <ReactLenis root options={{ duration: 0.4, easing: (t) => t }}>
        <CookieConsent />
        {children}
      </ReactLenis>
    </>
  );
};

export default WebsiteProviders;
