"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/libs/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isSubmitting?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    loadingText?: string;
    successText?: string;
    errorText?: string;
    transitionDuration?: number;
}

export function SubmitButton({
    children,
    isSubmitting = false,
    isSuccess = false,
    isError = false,
    loadingText = "Please wait",
    successText = "Success",
    errorText = "Failed",
    transitionDuration = 2000,
    className,
    ...props
}: SubmitButtonProps) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isSuccess) {
            setShowSuccess(true);
            setShowError(false);
            timer = setTimeout(() => setShowSuccess(false), transitionDuration);
        }
        if (isError) {
            setShowError(true);
            setShowSuccess(false);
            timer = setTimeout(() => setShowError(false), transitionDuration);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isSuccess, isError, transitionDuration]);

    return (
        <Button disabled={isSubmitting || showSuccess || showError} className={cn(className, showSuccess && "bg-green-600 hover:bg-green-600", showError && "bg-red-600 hover:bg-red-600")} {...props}>
            {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingText}
                </>
            ) : showSuccess ? (
                <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {successText}
                </>
            ) : showError ? (
                <>
                    <XCircle className="mr-2 h-4 w-4" />
                    {errorText}
                </>
            ) : (
                children
            )}
        </Button>
    );
}
