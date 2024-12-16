import { screen } from "@testing-library/react";
import ResendActivationEmail from "@/app/(dashboard)/resend-activation-email/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/resend-activation-form", () => ({
    ResendActivationForm: () => <div data-testid="resend-activation-form">Resend Activation Form</div>,
}));

describe("Resend Activation Email Page", () => {
    it("should render resend activation email page with form", () => {
        // Arrange & Act
        renderWithProviders(<ResendActivationEmail />);

        // Assert
        expect(screen.getByTestId("resend-activation-form")).toBeInTheDocument();
    });
});
