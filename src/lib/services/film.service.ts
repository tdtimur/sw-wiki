import type { FilmGetter } from "../interfaces/film.interface";
import mockFilmService from "./film-mock.service";

/**
 * Retrieve a film service implementation.
 *
 * @remarks
 * This function currently returns a {@link MockFilmService} instance for testing
 * and development purposes. In the future, this can be replaced with a real
 * API-backed implementation.
 *
 * @returns A {@link FilmGetter} implementation.
 */
export function getFilmService(): FilmGetter {
  // TODO: Add real service here later
  return mockFilmService;
}
