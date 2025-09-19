import type { Species } from "../models/species.model";
import type { JsonResponse } from "./response.interface";

export interface SpeciesGetter {
  get(id: string): Promise<JsonResponse<Species>>;
}
