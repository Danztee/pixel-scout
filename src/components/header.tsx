import React, { ReactNode } from "react";
import background from "@/public/background.png";
import Navbar from "@/components/navbar";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
      >
        <Navbar />
        {children}
      </header>
    </>
  );
};

export default Header;
