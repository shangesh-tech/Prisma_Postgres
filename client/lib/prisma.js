import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of PrismaClient in dev (Next.js hot reload problem)
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // Optional: helpful for debugging
  });

// Store the client globally in dev mode (so it doesn’t keep re-creating)
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
