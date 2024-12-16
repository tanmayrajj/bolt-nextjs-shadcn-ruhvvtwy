import { screen } from "@testing-library/react";
import { ResendActivationForm } from "@/components/resend-activation-form";
import { renderWithProviders } from "../test-utils";

describe("ResendActivationForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render resend activation form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<ResendActivationForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /resend activation email/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument(); // for domain select

        // Check for submit button
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

        // Check for domain selection
        expect(screen.getByText(/select domain/i)).toBeInTheDocument();

        // Check for description text
        expect(screen.getByText(/send activation email based on personemailid/i)).toBeInTheDocument();
    });
});
