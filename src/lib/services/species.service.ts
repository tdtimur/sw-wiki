import type { SpeciesGetter } from "../interfaces/species.interface";
import mockSpeciesService from "./species-mock.service";

/**
 * Retrieve a species service implementation.
 *
 * @remarks
 * This function currently returns a {@link MockSpeciesService} instance for testing
 * and development purposes. In the future, this can be replaced with a real
 * API-backed implementation.
 *
 * @returns A {@link SpeciesGetter} implementation.
 */
export function getSpeciesService(): SpeciesGetter {
  // TODO: Add real service here later
  return mockSpeciesService;
}
