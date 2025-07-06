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

export default function SignUp() {
  const router = useRouter();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "from-red-500 to-red-600";
      case 1:
        return "from-orange-500 to-orange-600";
      case 2:
        return "from-yellow-500 to-yellow-600";
      case 3:
        return "from-amber-500 to-amber-600";
      case 4:
        return "from-green-500 to-green-600";
      default:
        return "from-zinc-700 to-zinc-800";
    }
  };

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColor = getStrengthColor(passwordStrength);
  const strengthText = getStrengthText(passwordStrength);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/users", {
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

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Account created successfully");
      setFormData({
        email: "",
        username: "",
        password: "",
      });
      setAcceptTerms(false);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);
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
        Create Account
      </h1>
      <p className="mb-8 text-center text-zinc-400">
        Already having an account?{" "}
        <Link href="/auth/sign-in" className="text-amber-500 hover:underline">
          Sign in
        </Link>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#242728] rounded-xl sm:p-6 p-3 space-y-6"
      >
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
          <Label htmlFor="email" className="mb-2 block text-zinc-400 text-sm">
            Email
          </Label>

          <Input
            placeholder="Enter your email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            icon={<Mail className="h-5 w-5 text-zinc-400" />}
            autoComplete="email"
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
            minLength={8}
            autoComplete="new-password"
          />
          {formData.password && (
            <div className="mt-4">
              <div className="flex h-2 mb-1 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-1/4 rounded transition-all duration-300 ${
                      index < passwordStrength
                        ? `bg-gradient-to-b ${strengthColor}`
                        : "bg-gradient-to-b from-zinc-700 to-zinc-800"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-400">{strengthText}</p>
            </div>
          )}
        </div>

        <div className="mb-6 flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="h-4 w-auto accent-amber-500"
            required
          />
          <label htmlFor="terms" className="ml-4 text-sm text-zinc-400">
            I accept and agree to all the{" "}
            <Link href="/terms" className="text-amber-500 hover:underline">
              Terms & Conditions
            </Link>
            .
          </label>
        </div>

        <Button
          type="submit"
          className="h-[55px] cursor-pointer w-full rounded-[26px] bg-[#000000] py-4 text-white hover:bg-[#474D5099] disabled:bg-zinc-900/50 disabled:text-zinc-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-900/50"
          disabled={!acceptTerms || isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    </div>
  );
}
