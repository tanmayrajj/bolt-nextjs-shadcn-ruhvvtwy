/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { renderWithProviders } from "../test-utils";

describe("Home Page", () => {
    it("should render home page with correct heading", () => {
        // Arrange & Act
        renderWithProviders(<Home />);

        // Assert
        expect(screen.getByRole("heading", { name: /admin tools/i })).toBeInTheDocument();
    });
});
