import { sign, verify } from "jsonwebtoken";
import { jwtVerify } from "jose";

export const signToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};

// Edge Runtime compatible version for middleware
export const verifyTokenEdge = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    throw new Error("Invalid token");
  }
};
