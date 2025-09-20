/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterList from "./character-list";

// Mock next/navigation's notFound
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("CharacterList (with built-in mock service)", () => {
  it("renders a list of characters when people are found", async () => {
    render(await CharacterList({ ids: ["1"] }));

    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /luke skywalker/i })).toHaveAttribute(
      "href",
      "/characters/1"
    );
  });

  it("renders message when no characters belong to this species", async () => {
    render(await CharacterList({ ids: [] }));

    expect(
      await screen.findByText(/no character belongs to this species/i)
    ).toBeInTheDocument();
  });
});
