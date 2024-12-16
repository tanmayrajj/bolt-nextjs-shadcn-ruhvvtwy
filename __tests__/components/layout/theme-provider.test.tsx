/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/layout/theme-provider";

// Mock next-themes
jest.mock("next-themes", () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ThemeProvider", () => {
    it("should render children", () => {
        // Arrange & Act
        render(
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div data-testid="test-child">Test Content</div>
            </ThemeProvider>
        );

        // Assert
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
});
