import type { People } from "../models/people.model";
import type { JsonResponse, SwapiListResponse } from "./response.interface";

/**
 * Defines a service that can fetch a full list of `People`.
 */
export interface PeopleLister {
  /**
   * Retrieve all people.
   *
   * @returns A promise that resolves to a typed JSON response containing an array of people.
   */
  list(page: number): Promise<JsonResponse<SwapiListResponse<People>>>;
}

/**
 * Defines a service that can search for `People` by keyword.
 */
export interface PeopleSearcher {
  /**
   * Search for people by a keyword.
   *
   * @param keyword - A search string (e.g. part of a name).
   * @returns A promise that resolves to a typed JSON response containing an array of matching people.
   */
  search(
    page: number,
    keyword: string
  ): Promise<JsonResponse<SwapiListResponse<People>>>;
}

/**
 * Defines a service that can fetch a single `People` resource by ID.
 */
export interface PeopleGetter {
  /**
   * Retrieve a single person by their ID.
   *
   * @param id - The unique identifier of the person.
   * @returns A promise that resolves to a typed JSON response containing the person.
   */
  get(id: string): Promise<JsonResponse<People>>;
}

/**
 * A complete service contract for working with `People`.
 *
 * Combines the abilities to:
 * - fetch a list of people (`PeopleLister`)
 * - search for people (`PeopleSearcher`)
 * - fetch a single person by ID (`PeopleGetter`)
 */
export interface PeopleServicer extends PeopleGetter, PeopleLister, PeopleSearcher {}
