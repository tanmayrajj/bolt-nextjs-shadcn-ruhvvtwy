import React from "react";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { UserRole } from "@/types/user";

// Mock SessionProvider since we can't use the real one in tests
jest.mock("next-auth/react", () => ({
    SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock ThemeProvider
jest.mock("@/components/layout/theme-provider", () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
        username: "test-user",
        role: UserRole.ADMIN,
        email: "test@example.com",
        id: "1",
    },
};

export function renderWithProviders(ui: React.ReactElement) {
    return render(
        <SessionProvider session={mockSession}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {ui}
            </ThemeProvider>
        </SessionProvider>
    );
}
