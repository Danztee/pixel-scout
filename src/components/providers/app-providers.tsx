"use client";

import React from "react";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return <>{children}</>;
};

export default AppProviders;
