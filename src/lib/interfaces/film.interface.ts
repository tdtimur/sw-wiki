import type { Film } from "../models/film.model";
import type { JsonResponse } from "./response.interface";

/**
 * Provides access to Star Wars films.
 */
export interface FilmGetter {
  /**
   * Fetch a film by its SWAPI ID.
   *
   * @param id - The SWAPI film ID (e.g. "1" for *A New Hope*).
   * @returns A promise that resolves to a JSON-wrapped {@link Film} object.
   *
   * @example
   * ```ts
   * const filmResponse = await filmGetter.get("1");
   * const film = await filmResponse.json()
   * console.log(film.title); // "A New Hope"
   * ```
   */
  get(id: string): Promise<JsonResponse<Film>>;
}
