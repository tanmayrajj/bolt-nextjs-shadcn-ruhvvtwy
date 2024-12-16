import { screen } from "@testing-library/react";
import CourtesyPoints from "@/app/(dashboard)/courtesy-points/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/courtesy-points-form", () => ({
    CourtesyPointsForm: () => <div data-testid="courtesy-points-form">Courtesy Points Form</div>,
}));

describe("Courtesy Points Page", () => {
    it("should render courtesy points page with form", () => {
        // Arrange & Act
        renderWithProviders(<CourtesyPoints />);

        // Assert
        expect(screen.getByTestId("courtesy-points-form")).toBeInTheDocument();
    });
});
