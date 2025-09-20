/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilmList from "./film-list";
import { fakeFilms } from "@/lib/models/film.model";
import { parseSwapiPath } from "@/lib/utils";

describe("FilmList (using fakeFilms)", () => {
  it("renders a single film", async () => {
    const film = fakeFilms[0];
    const { id } = parseSwapiPath(film.url) ?? { resource: "", id: "" };
    render(await FilmList({ ids: [id] }));

    const year = new Date(film.release_date).getFullYear();
    expect(await screen.findByText(`${film.title} (${year})`)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(new Date(film.release_date).getFullYear().toString()))
    ).toBeInTheDocument();
  });

  it("renders message when no films are found", async () => {
    render(await FilmList({ ids: [] }));

    expect(await screen.findByText(/never appeared in any movie/i)).toBeInTheDocument();
  });
});
