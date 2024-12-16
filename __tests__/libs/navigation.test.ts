import { navigationItems } from "@/libs/navigation";
import { UserRole } from "@/types/user";

describe("Navigation Configuration", () => {
    it("should have valid navigation items", () => {
        navigationItems.forEach(item => {
            expect(item).toHaveProperty("title");
            expect(item).toHaveProperty("url");
            expect(item).toHaveProperty("icon");
            expect(item).toHaveProperty("allowedRoles");
            expect(Array.isArray(item.allowedRoles)).toBe(true);
        });
    });

    it("should have correct role-based access configuration", () => {
        const adminRoutes = navigationItems.filter(item => 
            item.allowedRoles.includes(UserRole.ADMIN)
        );
        const managerRoutes = navigationItems.filter(item => 
            item.allowedRoles.includes(UserRole.MANAGER)
        );
        const developerRoutes = navigationItems.filter(item => 
            item.allowedRoles.includes(UserRole.DEVELOPER)
        );

        expect(adminRoutes.length).toBeGreaterThan(0);
        expect(managerRoutes.length).toBeGreaterThan(0);
        expect(developerRoutes.length).toBeGreaterThan(0);
    });
});