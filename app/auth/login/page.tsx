"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { status } = useSession();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    useEffect(() => {
        if (status === "authenticated") {
            router.push(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    const handleMicrosoftSignIn = async () => {
        await signIn("microsoft-entra-id", { callbackUrl });
    };

    const handleCredentialsSignIn = async (email: string, password: string) => {
        await signIn("credentials", {
            email,
            password,
            callbackUrl,
        });
    };

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="text-2xl font-semibold">
                        <div className="animate-pulse">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Sign in to your account</h2>
                </div>
                <div className="mt-8 space-y-4">
                    <Button className="w-full" onClick={handleMicrosoftSignIn}>
                        Sign in with Microsoft
                    </Button>

                    {/* Quick login buttons for testing */}
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full" onClick={() => handleCredentialsSignIn("admin@test.com", "admin123")}>
                            Sign in as Admin
                        </Button>

                        <Button variant="outline" className="w-full" onClick={() => handleCredentialsSignIn("manager@test.com", "manager123")}>
                            Sign in as Manager
                        </Button>

                        <Button variant="outline" className="w-full" onClick={() => handleCredentialsSignIn("developer@test.com", "dev123")}>
                            Sign in as Developer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
