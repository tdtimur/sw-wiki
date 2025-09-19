import type { FilmGetter } from "../interfaces/film.interface";
import {
  type JsonResponse,
  mockResponse,
} from "../interfaces/response.interface";
import { fakeFilms, type Film } from "../models/film.model";

export class MockFilmService implements FilmGetter {
  private data: Film[];

  public constructor(seedData: Film[]) {
    this.data = seedData;
  }

  public async get(id: string): Promise<JsonResponse<Film>> {
    // Simulate a 1.5-second delay
    console.debug("Get film is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data[0]);
  }
}

const mockFilmService = new MockFilmService(fakeFilms);
export default mockFilmService;
