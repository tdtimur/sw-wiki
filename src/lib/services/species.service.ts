import type { JsonResponse, SwapiListResponse } from "../interfaces/response.interface";
import type { SpeciesServicer } from "../interfaces/species.interface";
import type { Species } from "../models/species.model";
import mockSpeciesService from "./species-mock.service";
import getConfig from "../config";

/**
 * Retrieve a species service implementation.
 *
 * @returns A {@link SpeciesServicer} implementation.
 */
export function getSpeciesService(): SpeciesServicer {
  return getConfig().isMock() ? mockSpeciesService : swapiSpeciesService;
}

/**
 * A real implementation of {@link SpeciesServicer}, using swapi.dev
 */
class SwapiSpeciesService implements SpeciesServicer {
  private host: string;
  private resourceUrl: string;

  public constructor() {
    this.host = getConfig().swapiHost;
    this.resourceUrl = this.host + "/api/species/";
  }

  /**
   * @inheritdoc
   */
  public async get(id: string): Promise<JsonResponse<Species>> {
    return await fetch(this.resourceUrl + id);
  }

  /**
   * @inheritdoc
   */
  public async list(page: number): Promise<JsonResponse<SwapiListResponse<Species>>> {
    return await fetch(this.resourceUrl + `?page=${page}`);
  }
}

const swapiSpeciesService = new SwapiSpeciesService();
