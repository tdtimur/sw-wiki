import type { FilmGetter } from "../interfaces/film.interface";
import { type JsonResponse, mockResponse } from "../interfaces/response.interface";
import { fakeFilms, type Film } from "../models/film.model";

/**
 * Mock implementation of {@link FilmGetter}.
 *
 * Useful for testing and local development when you don’t want to hit the real API.
 *
 * - Uses an in-memory array of films (`seedData`).
 * - Simulates network latency with a 1.5s delay.
 */
export class MockFilmService implements FilmGetter {
  private data: Film[];

  /**
   * Create a new mock film service.
   *
   * @param seedData - The list of films to return when `get` is called.
   */
  public constructor(seedData: Film[]) {
    this.data = seedData;
  }

  /**
   * @inheritdoc
   */
  public async get(id: string): Promise<JsonResponse<Film>> {
    // Simulate a 1.5-second delay
    console.debug("Get film is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data[0]);
  }
}

const mockFilmService = new MockFilmService(fakeFilms);
export default mockFilmService;
