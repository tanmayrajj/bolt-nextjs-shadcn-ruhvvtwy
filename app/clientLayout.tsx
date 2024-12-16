"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

function LoadingState() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center space-y-3">
                <div className="text-2xl font-semibold">
                    <div className="animate-pulse">Loading...</div>
                </div>
                <div className="text-sm text-muted-foreground">Please wait while we set up your session</div>
            </div>
        </div>
    );
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { status, data: session } = useSession({
        required: false,
        onUnauthenticated() {
            console.log("Session is unauthenticated");
        },
    });
    const pathname = usePathname();
    const router = useRouter();

    React.useEffect(() => {
        if (status === "unauthenticated" && pathname !== "/auth/login") {
            router.push("/auth/login");
        }
    }, [status, session, pathname]);

    if (status === "loading") {
        return <LoadingState />;
    }

    return (
        <>
            {status === "authenticated" && <AppSidebar />}
            <SidebarInset>
                {status === "authenticated" && <Header />}
                <div className="w-full h-full p-4">{children}</div>
            </SidebarInset>
        </>
    );
}
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
            <Toaster position="top-center" />
        </>
    );
};

export default ClientLayout;
