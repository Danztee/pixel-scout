import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const token = request.cookies.get("chocoChip_7f3aX")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const authenticatedUserId = decoded.userId;
    let id = "";

    if (userId === "me") {
      id = authenticatedUserId;
    } else if (userId !== authenticatedUserId) {
      return NextResponse.json(
        { error: "You can only access your own user data" },
        { status: 403 }
      );
    } else {
      id = userId;
    }

    const user = await db.select().from(users).where(eq(users.id, id));

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
