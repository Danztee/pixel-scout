import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenEdge } from "@/lib/token";

const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = path.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.includes(path);

  const tokenCookie = req.cookies.get("chocoChip_7f3aX");
  const token = tokenCookie?.value;

  // For protected routes, validate the token
  if (isProtectedRoute) {
    if (!token || token === "") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
    }

    try {
      // Validate the token
      await verifyTokenEdge(token);
    } catch (error) {
      // Token is invalid, redirect to sign-in
      console.log("Invalid token in middleware:", error);
      return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
    }
  }

  // For public routes, redirect to dashboard if valid token exists
  if (isPublicRoute && token && token !== "") {
    try {
      await verifyTokenEdge(token);
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    } catch (error) {
      // Token is invalid, allow access to public route
      console.log("Invalid token for public route:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
