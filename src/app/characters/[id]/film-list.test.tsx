/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmList from "./film-list";
import { fakeFilms } from "@/lib/models/film.model";
import { parseSwapiPath } from "@/lib/utils";

describe("FilmList (client, using fakeFilms)", () => {
  it("renders a single film", async () => {
    const film = fakeFilms[0];
    const { id } = parseSwapiPath(film.url) ?? { resource: "", id: "" };

    render(<FilmList ids={[id]} />);

    const year = new Date(film.release_date).getFullYear();

    await waitFor(
      () => {
        expect(screen.getByText(`${film.title} (${year})`)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("renders message when no films are found", async () => {
    render(<FilmList ids={[]} />);

    await waitFor(
      () => {
        expect(screen.getByText(/never appeared in any movie/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
