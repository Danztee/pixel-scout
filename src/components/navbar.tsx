"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png";
import user from "@/public/user.png";

const links = [
  { label: "iOS", route: "#" },
  { label: "Android", route: "#" },
  { label: "About", route: "#" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="container mx-auto p-4 lg:p-8 py-10 lg:py-20">
      <div className="max-w-2xl mx-auto relative rounded-3xl lg:rounded-full flex flex-row justify-between items-center">
        <Link
          href="/"
          className="bg-[#242728] border-[#474D50] border rounded-full p-2 lg:p-4 px-4 lg:px-6 text-white min-h-[40px] lg:min-h-[64px] flex items-center"
        >
          <div
            className="flex items-center justify-center cursor-pointer w-[100px] lg:w-[120px] h-[35px]"
            id="logo-cover"
          >
            <Image src={logo} alt="logo" className="object-contain" />
          </div>
        </Link>

        <ul
          className="hidden lg:flex gap-8 flex-col lg:flex-row mt-8 lg:mt-0 bg-[#242728] border-[#474D50] border rounded-full p-4 px-6 text-white min-h-[64px] items-center"
          id="links"
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.route}
                className={`text-xl text-[var(--primary-color)] ${
                  pathname === `${link.route}` ? "font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="bg-[#242728] border-[#474D50] border rounded-full p-1 lg:p-2 px-2 lg:px-4 text-white flex items-center justify-center min-h-[48px] lg:min-h-[64px] w-[48px] lg:w-[68px]">
          <Image
            src={user}
            alt="user"
            className="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
