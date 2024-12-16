import { screen } from "@testing-library/react";
import { ResetPasswordEmailForm } from "@/components/reset-password-email-form";
import { renderWithProviders } from "../test-utils";

describe("ResetPasswordEmailForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render reset password email form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<ResetPasswordEmailForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /reset password system/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument(); // for domain select

        // Check for buttons
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add more/i })).toBeInTheDocument();

        // Check for domain selection
        expect(screen.getByText(/select domain/i)).toBeInTheDocument();
    });
});
