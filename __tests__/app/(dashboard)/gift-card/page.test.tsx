import { screen } from "@testing-library/react";
import GiftCard from "@/app/(dashboard)/gift-card/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/gift-card-form", () => ({
    GiftCardForm: () => <div data-testid="gift-card-form">Gift Card Form</div>,
}));

describe("Gift Card Page", () => {
    it("should render gift card page with form", () => {
        // Arrange & Act
        renderWithProviders(<GiftCard />);

        // Assert
        expect(screen.getByTestId("gift-card-form")).toBeInTheDocument();
    });
});
