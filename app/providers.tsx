"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
    return (
        <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
