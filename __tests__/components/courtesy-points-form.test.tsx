import { screen } from "@testing-library/react";
import { CourtesyPointsForm } from "@/components/courtesy-points-form";
import { renderWithProviders } from "../test-utils";

describe("CourtesyPointsForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render courtesy points form with all required fields", () => {
        // Arrange & Act
        renderWithProviders(<CourtesyPointsForm />);

        // Assert
        // Check for heading
        expect(screen.getByRole("heading", { name: /courtesy point system/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument(); // for domain select
        expect(screen.getByPlaceholderText(/enter courtesy points/i)).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add more/i })).toBeInTheDocument();

        // Check for domain selection
        expect(screen.getByText(/select domain/i)).toBeInTheDocument();

        // Check for description text
        expect(screen.getByText(/allocate courtesy points to users across different domains/i)).toBeInTheDocument();
    });
});
