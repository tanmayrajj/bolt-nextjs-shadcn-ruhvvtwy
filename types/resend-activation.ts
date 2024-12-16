import { DomainId } from "@/types/domain-id";

export interface ResendActivationEntry {
    personEmailId: string;
    domainId: DomainId;
}

export interface ResendActivationPayload {
    entries: [ResendActivationEntry];
} 