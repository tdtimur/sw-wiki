/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterList from "./character-list";

// Mock next/navigation's notFound
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("CharacterList (client, with built-in mock service)", () => {
  it("renders a list of characters when people are found", async () => {
    render(<CharacterList ids={["1"]} />);

    await waitFor(
      async () => {
        expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
        const link = screen.getByRole("link", { name: /luke skywalker/i });
        expect(link).toHaveAttribute("href", "/characters/1");
      },
      { timeout: 3000 }
    );
  });

  it("renders message when no characters belong to this species", async () => {
    render(<CharacterList ids={[]} />);

    expect(
      await screen.findByText(/no character belongs to this species/i)
    ).toBeInTheDocument();
  });
});
