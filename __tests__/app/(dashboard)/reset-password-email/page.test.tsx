import { screen } from "@testing-library/react";
import ResetPasswordEmail from "@/app/(dashboard)/reset-password-email/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/reset-password-email-form", () => ({
    ResetPasswordEmailForm: () => <div data-testid="reset-password-email-form">Reset Password Email Form</div>,
}));

describe("Reset Password Email Page", () => {
    it("should render reset password email page with form", () => {
        // Arrange & Act
        renderWithProviders(<ResetPasswordEmail />);

        // Assert
        expect(screen.getByTestId("reset-password-email-form")).toBeInTheDocument();
    });
});
