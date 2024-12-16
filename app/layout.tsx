import React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ClientLayout from "@/app/clientLayout";
import Providers from "@/app/providers";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers session={session}>
                    <ClientLayout>{children}</ClientLayout>
                </Providers>
            </body>
        </html>
    );
}
