import { DomainId } from "@/types/domain-id";

export interface ManualResetPasswordEntry {
    emailAddress: string;
    domainId: DomainId;
}

export interface ManualResetPasswordPayload {
    entries: [ManualResetPasswordEntry];
} 