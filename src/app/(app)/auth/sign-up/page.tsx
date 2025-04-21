// app/(auth)/sign-up/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-2 lg:px-0">
      <h1 className="mb-4 text-center font-[BooksellerBk] text-4xl sm:text-5xl md:text-5xl italic text-white">Create Account</h1>
      <p className="mb-8 text-center text-zinc-400">
        Already having an account? <Link href="/auth/sign-in" className="text-amber-500 hover:underline">Sign in</Link>
      </p>

      <form className="bg-[#242728] rounded-xl sm:p-6 p-3">
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-zinc-400">
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
              className="w-full rounded-md bg-zinc-100 py-3 pl-10 pr-3 text-zinc-800 placeholder-zinc-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-zinc-400">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="email"
              id="email"
              placeholder="youremail@domain.com"
              className="w-full rounded-md bg-zinc-100 py-3 pl-10 pr-3 text-zinc-800 placeholder-zinc-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-zinc-400">
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full rounded-md bg-zinc-100 py-3 pl-10 pr-10 text-zinc-800"
              placeholder="**********"
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

        <div className="mb-6 flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="h-4 w-auto accent-amber-500"
          />
          <label htmlFor="terms" className="ml-4 text-sm text-zinc-400">
              I accept and agree to all the {" "}
              <Link href="/terms" className="text-amber-500 hover:underline">
              Terms & Conditions
              </Link>
            .
          </label>
        </div>
        <div className="flex h-2 mb-8 gap-2">
            <div className="w-1/4 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded"></div>
            <div className="w-1/4 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded"></div>
            <div className="w-1/4 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded"></div>
            <div className="w-1/4 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded"></div>
        </div>

      

        <button
          type="submit"
          className="cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-white hover:bg-[#474D5099] disabled:opacity-50"
          disabled={!acceptTerms}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}