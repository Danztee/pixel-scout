import { db } from "@/db";
import { users } from "@/db/schema";
import { signToken, verifyToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { NextRequest } from "next/server";

const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
});

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("chocoChip_7f3aX")?.value;

    if (!token) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = loginSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.username, validatedData.username),
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = await signToken(user.id);

    const response = NextResponse.json(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200 }
    );

    response.cookies.set("chocoChip_7f3aX", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
