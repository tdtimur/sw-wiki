import type { SpeciesGetter } from "../interfaces/species.interface";
import { type JsonResponse, mockResponse } from "../interfaces/response.interface";
import { fakeSpecies, type Species } from "../models/species.model";

/**
 * Mock implementation of {@link SpeciesGetter}.
 *
 * Useful for testing and local development when you don’t want to hit the real API.
 *
 * - Uses an in-memory array of species (`seedData`).
 * - Simulates network latency with a 1.5s delay.
 */
export class MockSpeciesService implements SpeciesGetter {
  private data: Species[];

  /**
   * Create a new mock film service.
   *
   * @param seedData - The list of films to return when `get` is called.
   */
  public constructor(seedData: Species[]) {
    this.data = seedData;
  }

  /**
   * @inheritdoc
   */
  public async get(id: string): Promise<JsonResponse<Species>> {
    // Simulate a 1.5-second delay
    console.debug("Get species is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data[0]);
  }
}

const mockSpeciesService = new MockSpeciesService(fakeSpecies);
export default mockSpeciesService;
