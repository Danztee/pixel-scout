import Link from "next/link";
import Image from "next/image";
import background from "@/public/background.png";
import logo from "@/public/logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="px-4 sm:px-6"
    >
      <div className="flex min-h-screen items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-md p-6 sm:p-8 ">
          <div className="mb-6 flex justify-center">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2 rounded-full bg-zinc-800/80 px-5 py-2 sm:px-6 sm:py-3">
                <Image src={logo} alt="Logo" className="h-6 sm:h-8 w-auto" priority />
              </div>
            </Link>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
