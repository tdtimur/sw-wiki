import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpeciesCard from "./species-card";
import { fakeSpecies } from "@/lib/models/species.model";

describe("SpeciesCard", () => {
  const mockSpecies = fakeSpecies[0];

  it("renders species name and classification", () => {
    render(<SpeciesCard species={mockSpecies} />);

    expect(screen.getByText("Zyphorian")).toBeInTheDocument();
    expect(screen.getByText("Mammal")).toBeInTheDocument(); // capitalizeWords should transform
  });

  it("renders a link to species detail page when URL has id", () => {
    render(<SpeciesCard species={mockSpecies} />);
    const link = screen.getByRole("link", { name: /view/i });

    expect(link).toHaveAttribute("href", "/species/100");
  });

  it("does not render link if url is missing or unparsable", () => {
    const invalidSpecies = { ...mockSpecies, url: "" };
    render(<SpeciesCard species={invalidSpecies} />);

    expect(screen.queryByRole("link", { name: /view/i })).not.toBeInTheDocument();
  });
});
