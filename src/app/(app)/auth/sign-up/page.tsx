// app/(auth)/sign-up/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-2 lg:px-0">
      <h1 className="mb-4 text-center font-[BooksellerBk] text-4xl sm:text-5xl md:text-5xl italic text-white">
        Create Account
      </h1>
      <p className="mb-8 text-center text-zinc-400">
        Already having an account?{" "}
        <Link href="/auth/sign-in" className="text-amber-500 hover:underline">
          Sign in
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
          <Label htmlFor="email" className="mb-2 block text-zinc-400 text-sm">
            Email
          </Label>

          <Input
            placeholder="Enter your email"
            id="email"
            type="email"
            icon={<Mail className="h-5 w-5 text-zinc-400" />}
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

        <div className="mb-6 flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="h-4 w-auto accent-amber-500"
          />
          <label htmlFor="terms" className="ml-4 text-sm text-zinc-400">
            I accept and agree to all the{" "}
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

        <Button
          type="submit"
          className="h-[55px] cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-white hover:bg-[#474D5099] disabled:opacity-50"
          disabled={!acceptTerms}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
