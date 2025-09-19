import type { SpeciesGetter } from "../interfaces/species.interface";
import mockSpeciesService from "./species-mock.service";

export function getSpeciesService(): SpeciesGetter {
  // TODO: Add real service here later
  return mockSpeciesService;
}
