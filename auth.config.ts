import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { UserRole } from "@/types/user";
import type { NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"

const users = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@test.com",
        password: "admin123",
        role: UserRole.ADMIN,
    },
    {
        id: "2",
        name: "Manager User",
        email: "manager@test.com",
        password: "manager123",
        role: UserRole.MANAGER,
    },
    {
        id: "3",
        name: "Developer User",
        email: "developer@test.com",
        password: "dev123",
        role: UserRole.DEVELOPER,
    },
];

export default {
    providers: [
        MicrosoftEntraID({
            name: "MicrosoftEntraID",
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const user = users.find(
                    (user) =>
                        user.email === credentials.email &&
                        user.password === credentials.password
                );

                if (!user) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
        signOut: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
} satisfies NextAuthConfig