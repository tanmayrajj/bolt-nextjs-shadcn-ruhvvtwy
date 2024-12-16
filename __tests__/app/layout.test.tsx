/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

// Mock next-auth
jest.mock("next-auth", () => ({
    default: jest.fn(),
}));

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
    SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useSession: () => ({
        status: "authenticated",
        data: {
            user: {
                name: "Test User",
                email: "test@example.com",
            },
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
    }),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
    usePathname: () => "/",
    redirect: jest.fn(),
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        refresh: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock sidebar component
jest.mock("@/components/ui/sidebar", () => ({
    SidebarProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Sidebar: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarMenuButton: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarRail: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarInset: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock AppSidebar component
jest.mock("@/components/layout/app-sidebar", () => ({
    AppSidebar: () => <div data-testid="app-sidebar">App Sidebar</div>,
}));

// Mock Header component
jest.mock("@/components/layout/header", () => ({
    Header: () => <div data-testid="header">Header</div>,
}));

// Mock NavUser component
jest.mock("@/components/layout/nav-user", () => ({
    NavUser: () => <div data-testid="nav-user">Nav User</div>,
}));

// Mock ThemeToggle component
jest.mock("@/components/layout/theme-toggle", () => ({
    ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
    Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

// Mock next/link
jest.mock("next/link", () => {
    return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

// Mock auth
jest.mock("@/auth", () => ({
    auth: jest.fn().mockResolvedValue({
        user: {
            name: "Test User",
            email: "test@example.com",
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }),
}));

// Mock next/font/google
jest.mock("next/font/google", () => ({
    Inter: jest.fn().mockReturnValue({
        className: "mock-font-class",
    }),
}));

describe("RootLayout", () => {
    it("renders children content", async () => {
        const TestChild = () => <div>Test Child Content</div>;
        const layout = await RootLayout({ children: <TestChild /> });
        render(layout);

        expect(screen.getByText("Test Child Content")).toBeInTheDocument();
    });
});
