"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    const attemptedPath = searchParams.get("path") || "";
    const requiredRoles = searchParams.get("roles")?.split(",") || [];

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="mx-auto max-w-2xl px-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="rounded-full bg-destructive/10 p-3">
                            <ShieldAlert className="h-6 w-6 text-destructive" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold tracking-tight">Access Denied</h1>
                            <p className="text-sm text-muted-foreground">You don't have permission to access this page.</p>
                        </div>
                        <div className="w-full max-w-md space-y-4">
                            <div className="rounded-lg bg-muted p-4 text-sm">
                                <div className="font-medium">Attempted Access Details:</div>
                                <div className="mt-2 space-y-2">
                                    <p>
                                        <span className="font-medium">Page:</span> <code className="rounded bg-muted-foreground/20 px-1">{attemptedPath}</code>
                                    </p>
                                    <p>
                                        <span className="font-medium">Your Role:</span> <code className="rounded bg-muted-foreground/20 px-1">{session?.user?.role || "None"}</code>
                                    </p>
                                    <p>
                                        <span className="font-medium">Required Roles:</span>{" "}
                                        {requiredRoles.map((role, index) => (
                                            <code key={role} className="rounded bg-muted-foreground/20 px-1 mx-1">
                                                {role}
                                            </code>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <Button className="w-full" variant="outline" onClick={() => router.back()}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
