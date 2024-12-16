import { render, screen, within } from "@testing-library/react";
import { NavUser } from "@/components/layout/nav-user";
import { signOut, useSession } from "next-auth/react";
import { UserRole } from "@/types/user";

// Mock next-auth
jest.mock("next-auth/react", () => ({
    signOut: jest.fn(),
    useSession: jest.fn(),
}));

// Mock sidebar hook
jest.mock("@/components/ui/sidebar", () => ({
    SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SidebarMenuButton: ({ children, ...props }: { children: React.ReactNode }) => <button {...props}>{children}</button>,
    useSidebar: () => ({ isMobile: false }),
}));

// Mock dropdown menu components
jest.mock("@/components/ui/dropdown-menu", () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-trigger">{children}</div>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-content">{children}</div>,
    DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-label">{children}</div>,
    DropdownMenuGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-group">{children}</div>,
    DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button onClick={onClick} data-testid="dropdown-item">
            {children}
        </button>
    ),
    DropdownMenuSeparator: () => <hr />,
}));

// Mock Lucide icons
jest.mock("lucide-react", () => ({
    ChevronsUpDown: () => <div data-testid="chevrons-icon">Chevrons</div>,
    User: () => <div data-testid="user-icon">User</div>,
    Shield: () => <div data-testid="shield-icon">Shield</div>,
    Key: () => <div data-testid="key-icon">Key</div>,
    Settings: () => <div data-testid="settings-icon">Settings</div>,
    LogOut: () => <div data-testid="logout-icon">Logout</div>,
}));

describe("NavUser", () => {
    const mockSession = {
        user: {
            name: "Test User",
            email: "test@example.com",
            role: UserRole.ADMIN,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not render when session is loading", () => {
        // Arrange
        (useSession as jest.Mock).mockReturnValue({
            status: "loading",
            data: null,
        });

        // Act
        render(<NavUser />);

        // Assert
        expect(screen.queryByTestId("dropdown-trigger")).not.toBeInTheDocument();
    });

    it("should not render when there is no user", () => {
        // Arrange
        (useSession as jest.Mock).mockReturnValue({
            status: "unauthenticated",
            data: null,
        });

        // Act
        render(<NavUser />);

        // Assert
        expect(screen.queryByTestId("dropdown-trigger")).not.toBeInTheDocument();
    });

    it("should render user information when session is available", () => {
        // Arrange
        (useSession as jest.Mock).mockReturnValue({
            status: "authenticated",
            data: mockSession,
        });

        // Act
        render(<NavUser />);

        // Assert
        const trigger = screen.getByTestId("dropdown-trigger");
        expect(within(trigger).getByText("Test User")).toBeInTheDocument();
        expect(within(trigger).getByText("test@example.com")).toBeInTheDocument();
        expect(within(trigger).getByTestId("user-icon")).toBeInTheDocument();
        expect(within(trigger).getByTestId("chevrons-icon")).toBeInTheDocument();
    });

    it("should render dropdown menu with all options", () => {
        // Arrange
        (useSession as jest.Mock).mockReturnValue({
            status: "authenticated",
            data: mockSession,
        });

        // Act
        render(<NavUser />);

        // Assert
        const content = screen.getByTestId("dropdown-content");
        const menuItems = screen.getAllByTestId("dropdown-item");

        expect(menuItems.find((item) => item.textContent?.includes(`Role: ${UserRole.ADMIN}`))).toBeInTheDocument();
        expect(menuItems.find((item) => item.textContent?.includes("Change Password"))).toBeInTheDocument();
        expect(menuItems.find((item) => item.textContent?.includes("Settings"))).toBeInTheDocument();
        expect(menuItems.find((item) => item.textContent?.includes("Log out"))).toBeInTheDocument();
    });

    it("should call signOut when logout is clicked", () => {
        // Arrange
        (useSession as jest.Mock).mockReturnValue({
            status: "authenticated",
            data: mockSession,
        });

        // Act
        render(<NavUser />);

        // Find and click the logout button
        const menuItems = screen.getAllByTestId("dropdown-item");
        const logoutButton = menuItems.find((item) => item.textContent?.includes("Log out"));
        logoutButton?.click();

        // Assert
        expect(signOut).toHaveBeenCalled();
    });
});
