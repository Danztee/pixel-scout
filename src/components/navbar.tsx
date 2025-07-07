"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";

const links = [
  { label: "iOS", route: "#" },
  { label: "Android", route: "#" },
  { label: "About", route: "#" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Add logout logic here
    console.log("Logout clicked");

    const response = await fetch("/api/users", {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return toast.error(data.error || "Failed to sign in");
    }

    toast.success("Logged out successfully");
    router.push("/auth/sign-in");
  };

  const { user } = useAuthStore();

  return (
    <nav className="container mx-auto p-4 lg:p-8 py-10">
      <div className="max-w-2xl mx-auto relative rounded-3xl lg:rounded-full flex flex-row justify-between items-center">
        <Link
          href="/"
          className="h-[3.5rem] bg-[#242728] border-[#474D50] border rounded-full p-2 lg:p-4 px-4 lg:px-6 text-white flex items-center"
        >
          <div
            className="flex items-center justify-center cursor-pointer"
            id="logo-cover"
          >
            <Image src={logo} alt="logo" className="object-contain w-[100px]" />
          </div>
        </Link>

        <ul
          className="h-[3.5rem] hidden lg:flex gap-8 flex-col lg:flex-row mt-8 lg:mt-0 bg-[#242728] border-[#474D50] border rounded-full p-2 px-4 text-white items-center"
          id="links"
        >
          {links
            .filter(
              (link) =>
                !(pathname.startsWith("/dashboard") && link.label === "About")
            )
            .map((link, index) => (
              <li key={index}>
                <Link
                  href={link.route}
                  className={`p-2 text-lg text-[var(--primary-color)] ${
                    pathname === `${link.route}` ? "font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

          {pathname.startsWith("/dashboard") && (
            <li>
              <button className="bg-[#242728] border-[#474D50] border rounded-[15px] p-2 text-white">
                Contribute
              </button>
            </li>
          )}
        </ul>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border border-[#474D5099] bg-[#242728] rounded-full p-1">
                <Avatar className="w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] rounded-full cursor-pointer">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                    alt={user.username}
                  />
                  <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 w-40 bg-[#242728] border-[#474D50] text-white">
              <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                <Link href="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#474D50]" />
              <DropdownMenuItem
                className="cursor-pointer text-red-500 hover:!text-white hover:bg-white/10 focus:bg-white/10"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/sign-in">
            <Button className="bg-[#000000] border border-[#474D5099] bg-gradient-to-b from-white/[0.08] via-white/[0.024] to-white/[0.08] h-12 px-8">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
