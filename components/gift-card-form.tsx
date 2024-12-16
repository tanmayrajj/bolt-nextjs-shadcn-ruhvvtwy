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
import { GiftCardEntry } from "@/types/gift-card";
import { DOMAIN_OPTIONS, DomainId } from "@/types/domain-id";
import apiService from "@/api_management";

const formSchema = z.object({
    personEmailId: z.string().email("Invalid email address"),
    domainId: z.nativeEnum(DomainId, {
        required_error: "Please select a domain",
    }),
    amount: z.number().min(1, "Amount must be greater than 0"),
}) satisfies z.ZodType<GiftCardEntry>;

export function GiftCardForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const form = useForm<GiftCardEntry>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personEmailId: "",
            domainId: undefined,
            amount: undefined,
        },
    });

    async function onSubmit(values: GiftCardEntry) {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            const result = await apiService.addGiftCard({ entries: [values] });
            setIsSuccess(true);
            toast.success("Gift card has been created successfully.");
            form.reset();
        } catch (error) {
            setIsError(true);
            toast.error("Failed to create gift card. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Gift Card Creation</h1>
                <p className="text-muted-foreground mt-2">Create a gift card for a user.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="rounded-md border">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-4 text-left font-medium">Person Email ID</th>
                                    <th className="p-4 text-left font-medium">Domain</th>
                                    <th className="p-4 text-left font-medium">Amount ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="personEmailId"
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
                                    <td className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter Amount in USD"
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                        />
                                                    </FormControl>
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
                            loadingText="Submitting..."
                            successText="Gift Card Created"
                            errorText="Submission Failed"
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    );
}
