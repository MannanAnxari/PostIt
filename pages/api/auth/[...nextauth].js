import NextAuth from "next-auth";
import clientPromise from "../../../lib/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: '427680584669-j1lpdggjm9m616n6qt6hnfqaqb87q887.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions);
