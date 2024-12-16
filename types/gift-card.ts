import { DomainId } from "@/types/domain-id";

export interface GiftCardEntry {
    personEmailId: string;
    domainId: DomainId;
    amount: number;
}

export interface GiftCardPayload {
    entries: GiftCardEntry[];
} 