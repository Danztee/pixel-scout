import { sign, verify } from "jsonwebtoken";

export const signToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};
