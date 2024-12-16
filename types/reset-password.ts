import { DomainId } from "@/types/domain-id";

export interface ResetPasswordEmailEntry {
    personEmailId: string;
    domainId: DomainId;
}

export interface ResetPasswordEmailPayload {
    entries: ResetPasswordEmailEntry[];
} 