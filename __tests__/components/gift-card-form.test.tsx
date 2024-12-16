import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GiftCardForm } from "@/components/gift-card-form";
import { renderWithProviders } from "../test-utils";
import apiService from "@/api_management";

describe("GiftCardForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render gift card form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<GiftCardForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /gift card creation/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument(); // for domain select
        expect(screen.getByPlaceholderText(/enter amount in usd/i)).toBeInTheDocument();

        // Check for submit button
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
});
