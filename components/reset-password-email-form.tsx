"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";
import apiService from "@/api_management";
import { useState } from "react";
import { SubmitButton } from "@/components/custom/submit-button";
import { ResetPasswordEmailEntry } from "@/types/reset-password";
import { DOMAIN_OPTIONS, DomainId } from "@/types/domain-id";

const formSchema = z.object({
    entries: z
        .array(
            z.object({
                personEmailId: z.string().email("Invalid email address"),
                domainId: z.nativeEnum(DomainId, {
                    required_error: "Please select a domain",
                }),
            })
        )
        .min(1, "At least one entry is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export function ResetPasswordEmailForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            entries: [{ personEmailId: "", domainId: undefined }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "entries",
    });

    async function onSubmit(values: FormSchema) {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            await apiService.resetPasswordEmail(values);
            setIsSuccess(true);
            toast.success("Reset password emails have been sent successfully.");
            form.reset();
        } catch (error) {
            setIsError(true);
            toast.error("Failed to send reset password emails. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Reset Password System</h1>
                <p className="text-muted-foreground mt-2">Send Reset Password Email based On PersonEmailId</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="rounded-md border">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="p-4 text-left font-medium">Person Email ID</th>
                                    <th className="p-4 text-left font-medium">Domain</th>
                                    <th className="p-4 w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((field, index) => (
                                    <tr key={field.id} className="border-t">
                                        <td className="p-4">
                                            <FormField
                                                control={form.control}
                                                name={`entries.${index}.personEmailId`}
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
                                                name={`entries.${index}.domainId`}
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
                                            {fields.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => append({ personEmailId: "", domainId: undefined! })} disabled={isSubmitting}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add More
                        </Button>
                        <SubmitButton type="submit" isSubmitting={isSubmitting} isSuccess={isSuccess} isError={isError} loadingText="Sending..." successText="Emails Sent" errorText="Sending Failed">
                            Submit
                        </SubmitButton>
                    </div>
                </form>
            </Form>
        </div>
    );
}
