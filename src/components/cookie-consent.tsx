"use client";

import { cn } from "@/lib/utils";
import { CookieIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const defaultConsent = {
    essential: true,
  };

  useEffect(() => {
    try {
      // Test if cookies are enabled
      document.cookie = "test_cookie=1; path=/";
      const cookiesEnabled = document.cookie.includes("test_cookie=1");

      // Delete test cookie
      document.cookie =
        "test_cookie=1; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

      if (!cookiesEnabled) {
        setHide(true);
        return;
      }

      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("consent="));

      if (cookies) {
        setConsent(JSON.parse(cookies.split("=")[1]));
        setHide(true);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error reading cookies: ", error);
    }
  }, []);

  const [consent, setConsent] = useState(defaultConsent);

  const saveConsent = (updatedConsent: Record<string, boolean>) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 2);
    const expires = date.toUTCString();
    document.cookie = `consent=${JSON.stringify(
      updatedConsent
    )}; expires=${expires}; path=/`;
  };

  const accept = () => {
    const updatedConsent = {
      ...consent,
    };
    setConsent(updatedConsent);
    saveConsent(updatedConsent);
    closeBanner();
  };

  const decline = () => {
    closeBanner();
  };

  const closeBanner = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("consent="));
      if (cookies) {
        const parsedConsent = JSON.parse(cookies.split("=")[1]);
        setConsent(parsedConsent);
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (error) {
      console.error("Error reading cookies: ", error);
    }
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity] opacity-0"
          : "transition-[opacity] opacity-100",
        hide && "hidden"
      )}
    >
      <div className="mx-3 mb-3 dark:bg-card bg-background border border-border rounded-lg">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-lg font-medium text-black">
            Manage Cookie Preferences
          </h1>
          <CookieIcon className="h-[1.2rem] w-[1.2rem]" color="#000" />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-sm text-left text-muted-foreground">
            We use cookies to ensure you get the best experience on our website.
            For more information on how we use cookies, please see our{" "}
            <Link href="/privacy" className="text-black hover:underline">
              cookie policy.
            </Link>
          </p>
        </div>
        <div className="px-3 py-2 grid grid-cols-2 gap-2 mt-2 border-t">
          <Button
            onClick={decline}
            className="w-full h-9 rounded-full text-black"
            variant="outline"
            size="sm"
          >
            Decline
          </Button>

          <Button
            onClick={accept}
            className="w-full h-9 rounded-full bg-black hover:bg-black hover:opacity-80 text-white"
            size="sm"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
