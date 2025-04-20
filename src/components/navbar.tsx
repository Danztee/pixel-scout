"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
// import { MenuIcon } from "lucide-react";
import user from "@/public/user.png";

const links = [
  { label: "Home", route: "/" },
  { label: "iOS", route: "#" },
  { label: "Android", route: "#" },
  { label: "About", route: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="container mx-auto p-8 py-12">
      <div className="max-w-4xl mx-auto relative rounded-lg lg:rounded-full flex justify-between items-center flex-col lg:flex-row">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="bg-[#242728] border-[#474D50] border rounded-full p-4 text-white"
        >
          <div
            className="flex items-baseline cursor-pointer w-[100px] lg:w-[120px]"
            id="logo-cover"
          >
            <Image src={logo} alt="logo" />
          </div>
        </Link>

        <ul
          className={`${
            open ? "flex" : "hidden"
          }  lg:items-center gap-8 flex-col lg:flex-row mt-8 lg:mt-0 lg:flex bg-[#242728] border-[#474D50] border rounded-full p-4 text-white`}
          id="links"
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className={`relative text-[var(--primary-color)] ${
                  pathname === `${link.route}` ? "font-bold" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="bg-[#242728] border-[#474D50] border rounded-full p-2 text-white">
          <Image src={user} alt="user" className="w-[35px] h-[35px]" />
        </div>

        {/* <div className="absolute right-[13px] top-[27%] lg:hidden cursor-pointer">
          <button onClick={() => setOpen((open) => !open)}>
            <MenuIcon color="#000" size={35} />
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
