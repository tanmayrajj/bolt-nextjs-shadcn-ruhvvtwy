import type { DefaultSession } from "next-auth"
import { UserRole } from "@/types/user"

declare module "next-auth" {
    interface User {
        role: UserRole
    }

    interface Session extends DefaultSession {
        user: {
            role: UserRole
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole
    }
} 