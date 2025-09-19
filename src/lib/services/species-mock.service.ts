import type { SpeciesGetter } from "../interfaces/species.interface";
import {
  type JsonResponse,
  mockResponse,
} from "../interfaces/response.interface";
import { fakeSpecies, type Species } from "../models/species.model";

export class MockSpeciesService implements SpeciesGetter {
  private data: Species[];

  public constructor(seedData: Species[]) {
    this.data = seedData;
  }

  public async get(id: string): Promise<JsonResponse<Species>> {
    // Simulate a 1.5-second delay
    console.debug("Get species is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data[0]);
  }
}

const mockSpeciesService = new MockSpeciesService(fakeSpecies);
export default mockSpeciesService;
