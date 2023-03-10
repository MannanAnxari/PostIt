import { PrismaClient } from "@prisma/client"

const client = globalThis.client || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.client = client

export default client



// const globalForPrisma = { prisma: PrismaClient }

// export const prisma =
//     globalForPrisma.prisma ||
//     new PrismaClient({
//         log: ['query'],
//     })

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma