import { PrismaClient } from "@prisma/client";
export { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const prisma = new PrismaClient();
