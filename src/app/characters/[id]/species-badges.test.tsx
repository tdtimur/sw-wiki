/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpeciesBadges from "./species-badges";
import { fakeSpecies } from "@/lib/models/species.model";
import { parseSwapiPath } from "@/lib/utils";

describe("SpeciesBadges (client, using fakeSpecies)", () => {
  it("renders multiple species badges", async () => {
    const { id } = parseSwapiPath(fakeSpecies[0].url) ?? { resource: "", id: "" };
    render(<SpeciesBadges ids={[id]} />);

    await waitFor(
      async () => {
        expect(await screen.findByText(fakeSpecies[0].name)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("renders 'Unknown' when no species are found", async () => {
    render(<SpeciesBadges ids={[]} />);

    await waitFor(
      async () => {
        expect(await screen.findByText(/unknown/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
