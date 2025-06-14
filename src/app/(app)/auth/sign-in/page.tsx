"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return toast.error(data.error || "Failed to sign in");
      }

      console.log(data);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Signed in successfully");
      setFormData({
        username: "",
        password: "",
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mx-auto px-1 sm:px-2 lg:px-0">
      <h1 className="mb-4 text-center font-[BooksellerBk] text-4xl sm:text-5xl md:text-5xl italic text-white">
        Sign In
      </h1>
      <p className="mb-8 text-center text-zinc-400">
        Don't have an account?{" "}
        <Link href="/auth/sign-up" className="text-amber-500 hover:underline">
          Sign up
        </Link>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#242728] rounded-xl sm:p-6 p-3 space-y-6"
      >
        <div>
          <Label htmlFor="email" className="mb-2 block text-zinc-400 text-sm">
            Username
          </Label>

          <Input
            placeholder="Enter a unique username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
            icon={<User className="h-5 w-5 text-zinc-400" />}
            type="text"
            autoComplete="nickname"
          />
        </div>

        <div>
          <Label
            htmlFor="password"
            className="mb-2 block text-zinc-400 text-sm"
          >
            Password
          </Label>
          <PasswordInput
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          className="h-[55px] cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-white hover:bg-[#474D5099] disabled:bg-zinc-900/50 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-900/50"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
