import { DomainId } from "@/types/domain-id";

export interface AccountDeletionEntry {
    personEmailId: string;
}

export interface AccountDeletionPayload {
    entries: AccountDeletionEntry[];
} 