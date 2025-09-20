import type { PeopleServicer } from "../interfaces/people.interface";
import type { JsonResponse, SwapiListResponse } from "../interfaces/response.interface";
import type { People } from "../models/people.model";
import mockPeopleService from "./people-mock.service";
import getConfig from "../config";

/**
 * Retrieve a people service implementation.
 *
 * @returns A {@link PeopleServicer} implementation.
 */
export function getPeopleService(): PeopleServicer {
  return getConfig().isMock() ? mockPeopleService : swapiPeopleService;
}

/**
 * A real implementation of {@link PeopleServicer}, using swapi.dev
 */
class SwapiPeopleService implements PeopleServicer {
  private host: string;
  private resourceUrl: string;

  public constructor() {
    this.host = getConfig().swapiHost;
    this.resourceUrl = this.host + "/api/people/";
  }

  /**
   * @inheritdoc
   */
  public async get(id: string): Promise<JsonResponse<People>> {
    return await fetch(this.resourceUrl + id);
  }

  /**
   * @inheritdoc
   */
  public async list(page: number): Promise<JsonResponse<SwapiListResponse<People>>> {
    return await fetch(this.resourceUrl + `?page=${page}`);
  }

  /**
   * @inheritdoc
   */
  public async search(
    page: number,
    keyword: string
  ): Promise<JsonResponse<SwapiListResponse<People>>> {
    return await fetch(this.resourceUrl + `?search=${keyword}&page=${page}`);
  }
}

const swapiPeopleService = new SwapiPeopleService();
