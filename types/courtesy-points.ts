import { DomainId } from "@/types/domain-id";

export interface CourtesyPointEntry {
    personEmailId: string;
    domainId: DomainId;
    points: number;
}

export interface CourtesyPointsPayload {
    entries: CourtesyPointEntry[];
} 