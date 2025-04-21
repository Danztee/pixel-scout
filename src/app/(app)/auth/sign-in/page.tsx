"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-0 ">
      <h1 className="mb-4 text-center font-[BooksellerBk] text-4xl sm:text-5xl md:text-5xl italic text-white">
        Create Account
      </h1>
      <p className="mb-8 text-center text-zinc-400 text-sm sm:text-base">
        Don&apos;t have an account? {" "}
        <Link href="/auth/sign-up" className="text-amber-500 hover:underline">
          Sign up
        </Link>
      </p>

      <form className="bg-[#242728] rounded-xl sm:p-6 p-3">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-zinc-400 text-sm sm:text-base">
            Username
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              id="username"
              placeholder="Enter a unique username"
              className="w-full rounded-md bg-zinc-100 py-3 pl-10 pr-3 text-sm sm:text-base text-zinc-800 placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-zinc-400 text-sm sm:text-base">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="*********"
              className="w-full rounded-md bg-zinc-100 py-3 pl-10 pr-10 text-sm sm:text-base text-zinc-800 placeholder-zinc-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-zinc-400" />
              ) : (
                <Eye className="h-5 w-5 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="mb-6 text-right">
          <Link href="/forgot-password" className="text-sm text-amber-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-sm sm:text-base text-white hover:bg-[#474D5099] transition-colors duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
