import type { FilmGetter } from "../interfaces/film.interface";
import type { JsonResponse } from "../interfaces/response.interface";
import type { Film } from "../models/film.model";
import mockFilmService from "./film-mock.service";
import getConfig from "../config";

/**
 * Retrieve a film service implementation.
 *
 * @returns A {@link FilmGetter} implementation.
 */
export function getFilmService(): FilmGetter {
  return getConfig().isMock() ? mockFilmService : swapiFilmService;
}

/**
 * A real implementation of {@link FilmGetter}, using swapi.dev
 */
class SwapiFilmService implements FilmGetter {
  private host: string;
  private resourceUrl: string;

  public constructor() {
    this.host = getConfig().swapiHost;
    this.resourceUrl = this.host + "/api/films/";
  }

  /**
   * @inheritdoc
   */
  public async get(id: string): Promise<JsonResponse<Film>> {
    return await fetch(this.resourceUrl + id);
  }
}

const swapiFilmService = new SwapiFilmService();
