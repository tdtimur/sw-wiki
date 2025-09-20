/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpeciesBadges from "./species-badges";
import { fakeSpecies } from "@/lib/models/species.model";
import { parseSwapiPath } from "@/lib/utils";

describe("SpeciesBadges (using fakeSpecies)", () => {
  it("renders multiple species badges", async () => {
    const { id } = parseSwapiPath(fakeSpecies[0].url) ?? { resource: "", id: "" };
    render(await SpeciesBadges({ ids: [id] }));

    expect(await screen.findByText(fakeSpecies[0].name)).toBeInTheDocument();
  });

  it("renders 'Unknown' when no species are found", async () => {
    render(await SpeciesBadges({ ids: [] }));

    expect(await screen.findByText(/unknown/i)).toBeInTheDocument();
  });
});
