"use client";

import React from "react";
import CookieConsent from "./cookie-consent";
import { ReactLenis } from "lenis/react";

type providersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<providersProps> = ({ children }) => {
  return (
    <>
      <ReactLenis root options={{ duration: 0.2, easing: (t) => t }}>
        <CookieConsent />
        {children}
      </ReactLenis>
    </>
  );
};
export default Providers;
