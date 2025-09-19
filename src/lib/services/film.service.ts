import type { FilmGetter } from "../interfaces/film.interface";
import mockFilmService from "./film-mock.service";

export function getFilmService(): FilmGetter {
  // TODO: Add real service here later
  return mockFilmService;
}
