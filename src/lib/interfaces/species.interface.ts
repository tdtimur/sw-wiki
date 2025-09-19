import type { Species } from "../models/species.model";
import type { JsonResponse } from "./response.interface";

/**
 * Provides access to Star Wars species.
 */
export interface SpeciesGetter {
  /**
   * Fetch a species by its SWAPI ID.
   *
   * @param id - The SWAPI film ID (e.g. "1" for *wookie*).
   * @returns A promise that resolves to a JSON-wrapped {@link Species} object.
   *
   * @example
   * ```ts
   * const speciesResponse = await speciesGetter.get("1");
   * const species = await speciesResponse.json()
   * console.log(species.name); // "Wookie"
   * ```
   */
  get(id: string): Promise<JsonResponse<Species>>;
}
