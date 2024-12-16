import { screen } from "@testing-library/react";
import { ManualResetPasswordForm } from "@/components/manual-reset-password-form";
import { renderWithProviders } from "../test-utils";

describe("ManualResetPasswordForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render manual reset password form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<ManualResetPasswordForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /manual reset password/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument(); // for domain select

        // Check for submit button
        expect(screen.getByRole("button", { name: /generate reset password url/i })).toBeInTheDocument();

        // Check for domain selection
        expect(screen.getByText(/select domain/i)).toBeInTheDocument();

        // Check for description text
        expect(screen.getByText(/generate reset password link for user having problem in receiving reset password email/i)).toBeInTheDocument();

        // Check for precautions section
        expect(screen.getByRole("heading", { name: /precautions/i })).toBeInTheDocument();
        expect(screen.getByText(/the reset password url is valid for 24 hours only/i)).toBeInTheDocument();
        expect(screen.getByText(/the url can be used only once/i)).toBeInTheDocument();
        expect(screen.getByText(/please ensure the user changes their password immediately after receiving the url/i)).toBeInTheDocument();
    });
});
