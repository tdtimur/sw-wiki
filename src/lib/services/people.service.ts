import type { PeopleServicer } from "../interfaces/people.interface";
import mockPeopleService from "./people-mock.service";

export function getPeopleService(): PeopleServicer {
  // TODO: Add real service here later
  return mockPeopleService;
}
