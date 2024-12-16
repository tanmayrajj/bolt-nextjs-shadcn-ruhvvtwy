import { screen } from "@testing-library/react";
import AccountDeletion from "@/app/(dashboard)/account-deletion/page";
import { renderWithProviders } from "../../../test-utils";

jest.mock("@/components/account-deletion-form", () => ({
    AccountDeletionForm: () => <div data-testid="account-deletion-form">Account Deletion Form</div>,
}));

describe("Account Deletion Page", () => {
    it("should render account deletion page with form", () => {
        // Arrange & Act
        renderWithProviders(<AccountDeletion />);

        // Assert
        expect(screen.getByTestId("account-deletion-form")).toBeInTheDocument();
    });
});
