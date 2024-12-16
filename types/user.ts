
export enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    DEVELOPER = "developer",
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
