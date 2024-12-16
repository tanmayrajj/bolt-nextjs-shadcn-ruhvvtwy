import { screen } from "@testing-library/react";
import ResetPasswordAdmin from "@/app/(dashboard)/reset-password-admin/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/manual-reset-password-form", () => ({
    ManualResetPasswordForm: () => <div data-testid="manual-reset-password-form">Manual Reset Password Form</div>,
}));

describe("Reset Password Admin Page", () => {
    it("should render reset password admin page with form", () => {
        // Arrange & Act
        renderWithProviders(<ResetPasswordAdmin />);

        // Assert
        expect(screen.getByTestId("manual-reset-password-form")).toBeInTheDocument();
    });
});
