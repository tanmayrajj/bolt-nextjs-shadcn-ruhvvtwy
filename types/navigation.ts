import { UserRole } from "@/types/user";

export interface NavigationItem {
    title: string;
    url: string;
    icon: React.ElementType;
    allowedRoles: UserRole[];
}
