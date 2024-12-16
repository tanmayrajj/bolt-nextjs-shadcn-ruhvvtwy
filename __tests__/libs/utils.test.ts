import { cn } from "@/libs/utils";

describe("cn utility function", () => {
    it("should merge class names correctly", () => {
        expect(cn("class1", "class2")).toBe("class1 class2");
        expect(cn("class1", undefined, "class2")).toBe("class1 class2");
        expect(cn("class1", null, "class2")).toBe("class1 class2");
        expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
    });

    it("should handle conditional classes", () => {
        const isActive = true;
        const isPending = false;
        expect(cn("base", isActive && "active", isPending && "pending")).toBe("base active");
    });

    it("should handle object syntax", () => {
        expect(cn({ "class1": true, "class2": false, "class3": true })).toBe("class1 class3");
    });
});