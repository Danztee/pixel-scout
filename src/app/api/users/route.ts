import { db } from "@/db";
import { users } from "@/db/schema";
import { signToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    const emailExists = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (emailExists.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const usernameExists = await db
      .select()
      .from(users)
      .where(eq(users.username, validatedData.username))
      .limit(1);

    if (usernameExists.length > 0) {
      return NextResponse.json(
        { error: "User with this username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newUser = await db
      .insert(users)
      .values({
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
      })
      .returning();

    const token = await signToken(newUser[0].id);

    const response = NextResponse.json(
      {
        user: {
          username: newUser[0].username,
          email: newUser[0].email,
          id: newUser[0].id,
          createdAt: newUser[0].createdAt,
          updatedAt: newUser[0].updatedAt,
        },
      },
      { status: 201 }
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
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: 200 });

  // Clear the cookie by setting it to empty and expiring it
  response.cookies.set("chocoChip_7f3aX", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0), // Ensure it expires immediately
  });

  return response;
}
