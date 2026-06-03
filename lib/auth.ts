import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import argon2 from "argon2"
import { prisma } from "@/lib/prisma/prisma"
import { Role } from "@/lib/generated/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        })

        if (!user) return null

        const isValidPassword = await argon2.verify(
          user.password,
          String(credentials.password)
        )

        if (!isValidPassword) return null
        if (user.role !== Role.ADMIN) return null

        return {
          id: String(user.id),
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
        }
      },
    }),
  ],

  pages: {
    signIn: "/admin/signin",
  },

  session: {
    strategy: "jwt",
  },
}