import { renderHook } from "@testing-library/react";
import { useIsMobile } from "@/libs/hooks/use-mobile";

describe("useIsMobile hook", () => {
    const mockMatchMedia = (matches: boolean) => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    };

    beforeEach(() => {
        mockMatchMedia(false);
    });

    it("should return false for desktop viewport", () => {
        mockMatchMedia(false);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it("should return true for mobile viewport", () => {
        mockMatchMedia(true);
        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it("should update when viewport changes", () => {
        const { result, rerender } = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        mockMatchMedia(true);
        rerender();
        expect(result.current).toBe(true);
    });
});