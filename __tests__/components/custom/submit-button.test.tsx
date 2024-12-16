import { render, screen, fireEvent, act } from "@testing-library/react";
import { SubmitButton } from "@/components/custom/submit-button";

describe("SubmitButton", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should render with custom text", () => {
        render(<SubmitButton>Custom Text</SubmitButton>);
        expect(screen.getByText("Custom Text")).toBeInTheDocument();
    });

    it("should show loading state", () => {
        render(
            <SubmitButton isSubmitting loadingText="Processing...">
                Submit
            </SubmitButton>
        );
        expect(screen.getByText("Processing...")).toBeInTheDocument();
        expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    });

    it("should show success state and revert after timeout", () => {
        const { rerender } = render(
            <SubmitButton isSuccess={false} successText="Done!">
                Submit
            </SubmitButton>
        );

        rerender(
            <SubmitButton isSuccess={true} successText="Done!">
                Submit
            </SubmitButton>
        );

        expect(screen.getByText("Done!")).toBeInTheDocument();
        expect(screen.getByTestId("success-icon")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("should show error state and revert after timeout", () => {
        const { rerender } = render(
            <SubmitButton isError={false} errorText="Failed!">
                Submit
            </SubmitButton>
        );

        rerender(
            <SubmitButton isError={true} errorText="Failed!">
                Submit
            </SubmitButton>
        );

        expect(screen.getByText("Failed!")).toBeInTheDocument();
        expect(screen.getByTestId("error-icon")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(screen.getByText("Submit")).toBeInTheDocument();
    });
});