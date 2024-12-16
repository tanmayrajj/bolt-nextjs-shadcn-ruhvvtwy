import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
    useTheme: jest.fn()
}));

describe("ThemeToggle", () => {
    const mockSetTheme = jest.fn();

    beforeEach(() => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: "light",
            setTheme: mockSetTheme
        });
    });

    it("should render theme toggle button", () => {
        render(<ThemeToggle />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should toggle theme when clicked", () => {
        render(<ThemeToggle />);
        const button = screen.getByRole("button");
        
        fireEvent.click(button);
        expect(mockSetTheme).toHaveBeenCalledWith("dark");

        (useTheme as jest.Mock).mockReturnValue({
            theme: "dark",
            setTheme: mockSetTheme
        });

        fireEvent.click(button);
        expect(mockSetTheme).toHaveBeenCalledWith("light");
    });

    it("should display correct text based on current theme", () => {
        render(<ThemeToggle />);
        expect(screen.getByText("Dark mode")).toBeInTheDocument();

        (useTheme as jest.Mock).mockReturnValue({
            theme: "dark",
            setTheme: mockSetTheme
        });

        render(<ThemeToggle />);
        expect(screen.getByText("Light mode")).toBeInTheDocument();
    });
});