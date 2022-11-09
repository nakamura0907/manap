import jwt from "jsonwebtoken";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "MY_SECRET_KEY";

export const signToken = (
  payload: string | object | Buffer,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, JWT_SECRET_KEY, options);
};
