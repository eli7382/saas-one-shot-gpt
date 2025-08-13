import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./db";
import { env } from "./env";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  session: { strategy: "database", maxAge: 60 * 60 * 24 * 7 },
  providers: [
    Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),
    Github({ clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET }),
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user?.passwordHash) return null;
        const ok = await argon2.verify(user.passwordHash, credentials.password);
        return ok ? { id: user.id, email: user.email, name: user.name ?? "" } : null;
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) (session.user as any).id = (user as any).id ?? (session.user as any).id;
      return session;
    }
  },
  pages: { signIn: "/auth/signin" },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === "development",
  adapter: {
    // Minimal Prisma adapter using Session/Account/User models
    async createUser(data) { return prisma.user.create({ data }); },
    async getUser(id) { return prisma.user.findUnique({ where: { id } }); },
    async getUserByEmail(email) { return prisma.user.findUnique({ where: { email } }); },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId } }});
      return account ? prisma.user.findUnique({ where: { id: account.userId } }) : null;
    },
    async linkAccount(data) { await prisma.account.create({ data }); },
    async createSession(data) { return prisma.session.create({ data }); },
    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({ where: { sessionToken } });
      if (!session) return null;
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if (!user) return null;
      return { session, user };
    },
    async updateSession(data) { return prisma.session.update({ where: { sessionToken: data.sessionToken! }, data }); },
    async deleteSession(sessionToken) { await prisma.session.delete({ where: { sessionToken } }); }
  } as any
}; 