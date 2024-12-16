import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { navigationItems } from "@/libs/navigation";

const { auth } = NextAuth(authConfig)

const authRoutes = ["/auth/login", "/auth/error"];

const DEFAULT_LOGIN_REDIRECT = "/";

export default auth(async function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // Skip auth check for API routes
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
        }
        return NextResponse.next()
    }

    if (!isLoggedIn && !isAuthRoute) {
        return NextResponse.redirect(
            new URL(`/auth/login`, req.url)
        );
    }

    // Check role-based access
    const requiredRoles = navigationItems.find(item => item.url === nextUrl.pathname)?.allowedRoles;
    if (requiredRoles && (!req.auth?.user?.role || !requiredRoles.includes(req.auth.user.role))) {
        return NextResponse.redirect(
            new URL(
                `/unauthorized?path=${encodeURIComponent(nextUrl.pathname)}&roles=${encodeURIComponent(requiredRoles.join(","))}`,
                req.url
            )
        );
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'
    ],
}; 