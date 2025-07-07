import React from "react";
import background from "@/public/footer-bg.png";
import openDesigners from "@/public/open-designers.png";
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
      className="border-t border-[#474D50]"
    >
      <div className="pb-20 p-8 max-w-[900px] mx-auto relative rounded-lg lg:rounded-full flex justify-between gap-10 items-center flex-col lg:flex-row">
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

        <ul className="flex lg:items-center gap-8 lg:flex bg-[#242728] border-[#474D50] border rounded-full p-4 text-white w-fit">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className="relative text-[var(--primary-color)] font-bold hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="https://open-designers.org"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#242728] border-[#474D50] border rounded-full p-4 text-white"
        >
          <div
            className="flex items-baseline cursor-pointer w-[180px]"
            id="logo-cover"
          >
            <Image src={openDesigners} alt="logo" />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
