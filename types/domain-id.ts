export enum DomainId {
    CHEAPOAIR_COM = "92",
    CHEAPOAIR_CA = "93",
    ONETRAVEL_COM = "95"
}

export interface DomainOption {
    id: DomainId;
    label: string;
    url: string;
}

export const DOMAIN_OPTIONS: DomainOption[] = [
    { id: DomainId.CHEAPOAIR_COM, label: "CheapOair.com", url: "www.cheapoair.com" },
    { id: DomainId.CHEAPOAIR_CA, label: "CheapOair.ca", url: "www.cheapoair.ca" },
    { id: DomainId.ONETRAVEL_COM, label: "OneTravel.com", url: "www.onetravel.com" },
];
