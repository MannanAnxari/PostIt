import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../lib/client'

const adapter = PrismaAdapter(prisma);

export const authOption = {
    adapter: PrismaAdapter(prisma),
    // secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: '427680584669-j1lpdggjm9m616n6qt6hnfqaqb87q887.apps.googleusercontent.com',
            clientSecret: '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',
        }),
    ],
}

export default NextAuth(authOption);
