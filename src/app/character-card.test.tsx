import { render, screen } from "@testing-library/react";
import CharacterCard from "./character-card";
import { fakePeople } from "@/lib/models/people.model";
import "@testing-library/jest-dom";

describe("CharacterCard", () => {
  const mockCharacter = fakePeople[0];

  it("renders character name", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("renders gender badge", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("renders birth year", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Birth year: 19BBY")).toBeInTheDocument();
  });

  it("renders link when characterId is present", () => {
    render(<CharacterCard character={mockCharacter} />);
    const link = screen.getByRole("link", { name: /view/i });
    expect(link).toHaveAttribute("href", "/characters/1");
  });

  it("does not render link when url is invalid", () => {
    const invalidCharacter = { ...mockCharacter, url: "/invalid" };
    render(<CharacterCard character={invalidCharacter} />);
    expect(screen.queryByRole("link", { name: /view/i })).not.toBeInTheDocument();
  });
});
