"use client";

import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleToggleClick = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="*********"
          className={cn(
            "hide-password-toggle placeholder:text-zinc-500",
            className
          )}
          ref={ref}
          {...props}
          id="password"
          icon={<Lock className="h-5 w-5 text-zinc-400" />}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
            onClick={handleToggleClick}
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            ) : (
              <EyeOffIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>

        {/* hides browsers password toggles */}
        <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
              visibility: hidden;
              pointer-events: none;
              display: none;
          }
        `}</style>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
