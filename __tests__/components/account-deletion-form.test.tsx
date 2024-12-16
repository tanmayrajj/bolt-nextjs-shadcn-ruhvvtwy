import { screen } from "@testing-library/react";
import { AccountDeletionForm } from "@/components/account-deletion-form";
import { renderWithProviders } from "../test-utils";

describe("AccountDeletionForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render account deletion form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<AccountDeletionForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /account deletion system/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add more/i })).toBeInTheDocument();

        // Check for warning message
        expect(screen.getByText(/deleting on single brand is not allowed/i)).toBeInTheDocument();
    });
});
