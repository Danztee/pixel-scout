import React from "react";
import background from "@/public/footer-bg.png";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const links = [
  { label: "Github", route: "/" },
  { label: "Figma", route: "/" },
  { label: "About", route: "/" },
];

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <div className="pb-20 p-8 max-w-[500px] mx-auto relative rounded-lg lg:rounded-full flex justify-between items-center flex-col lg:flex-row">
        <Link
          href="/"
          className="bg-[#242728] border-[#474D50] border rounded-full p-4 text-white"
        >
          <div
            className="flex items-baseline cursor-pointer w-[100px] lg:w-[120px]"
            id="logo-cover"
          >
            <Image src={logo} alt="logo" />
          </div>
        </Link>

        <ul className="flex lg:items-center gap-8 flex-col lg:flex-row mt-8 lg:mt-0 lg:flex bg-[#242728] border-[#474D50] border rounded-full p-4 text-white w-fit">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className="relative text-[var(--primary-color)] font-bold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
