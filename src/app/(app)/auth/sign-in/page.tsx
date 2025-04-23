import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { User } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-0 ">
      <h1 className="mb-4 text-center font-[BooksellerBk] text-4xl sm:text-5xl md:text-5xl italic text-white">
        Sign In
      </h1>
      <p className="mb-8 text-center text-zinc-400 text-sm sm:text-base">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="text-amber-500 hover:underline">
          Sign up
        </Link>
      </p>

      <form className="bg-[#242728] rounded-xl sm:p-6 p-3 space-y-6">
        <div>
          <Label
            htmlFor="username"
            className="mb-2 block text-zinc-400 text-sm"
          >
            Username
          </Label>

          <Input
            placeholder="Enter a unique username"
            id="username"
            icon={<User className="h-5 w-5 text-zinc-400" />}
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="mb-2 block text-zinc-400 text-sm"
          >
            Password
          </Label>
          <PasswordInput id="password" />
        </div>

        <div className="mb-6 text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-amber-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="h-[55px] cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-sm sm:text-base text-white hover:bg-[#474D5099] transition-colors duration-200"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
