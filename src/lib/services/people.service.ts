import type { PeopleServicer } from "../interfaces/people.interface";
import mockPeopleService from "./people-mock.service";

/**
 * Retrieve a people service implementation.
 *
 * @remarks
 * This function currently returns a {@link MockPeopleService} instance for testing
 * and development purposes. In the future, this can be replaced with a real
 * API-backed implementation.
 *
 * @returns A {@link PeopleServicer} implementation.
 */
export function getPeopleService(): PeopleServicer {
  // TODO: Add real service here later
  return mockPeopleService;
}
