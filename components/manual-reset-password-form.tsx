"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { SubmitButton } from "@/components/custom/submit-button";
import { ManualResetPasswordEntry } from "@/types/manual-reset-password";
import { DOMAIN_OPTIONS, DomainId } from "@/types/domain-id";
import apiService from "@/api_management";

const formSchema = z.object({
    emailAddress: z.string().email("Invalid email address"),
    domainId: z.nativeEnum(DomainId, {
        required_error: "Please select a domain",
    }),
}) satisfies z.ZodType<ManualResetPasswordEntry>;

export function ManualResetPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const form = useForm<ManualResetPasswordEntry>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: "",
            domainId: undefined,
        },
    });

    async function onSubmit(values: ManualResetPasswordEntry) {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            await apiService.manualResetPassword({ entries: [values] });
            setIsSuccess(true);
            toast.success("Reset password URL has been generated successfully.");
            form.reset();
        } catch (error) {
            setIsError(true);
            toast.error("Failed to generate reset password URL. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Manual Reset Password</h1>
                <p className="text-muted-foreground mt-2">Generate reset password link for user having problem in receiving reset password email</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="rounded-md border">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-4 text-left font-medium">Email Address</th>
                                    <th className="p-4 text-left font-medium">Domain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="emailAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="email@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="domainId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select domain" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {DOMAIN_OPTIONS.map((domain) => (
                                                                <SelectItem key={domain.id} value={domain.id}>
                                                                    {domain.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-start">
                        <SubmitButton
                            type="submit"
                            isSubmitting={isSubmitting}
                            isSuccess={isSuccess}
                            isError={isError}
                            loadingText="Generating..."
                            successText="URL Generated"
                            errorText="Generation Failed"
                        >
                            Generate Reset Password URL
                        </SubmitButton>
                    </div>
                </form>
            </Form>

            <div className="mt-8 space-y-2">
                <h2 className="text-lg font-semibold">Precautions:</h2>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>The reset password URL is valid for 24 hours only</li>
                    <li>The URL can be used only once</li>
                    <li>Please ensure the user changes their password immediately after receiving the URL</li>
                </ul>
            </div>
        </div>
    );
}
