import prisma from "@/services/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // @ts-ignore
      scope: "read:user",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {},
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user, isNewUser }) {
      if (isNewUser && user) {
        const account = await prisma.tenant.findFirst({
          where: {
            tenantUsers: {
              some: {
                userId: user.id,
              },
            },
          },
        });

        if (!account) {
          await prisma.tenant.create({
            data: {
              name: "Meu tenant",
              image: "",
              plan: "free",
              slug: "meu-tenant",
              tenantUsers: {
                create: {
                  userId: user.id,
                  role: "owner",
                },
              },
            },
          });
        }
      }
      return token;
    },
  },
  events: {},
  debug: false,
});
