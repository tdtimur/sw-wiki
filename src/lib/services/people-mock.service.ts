import type { PeopleServicer } from "../interfaces/people.interface";
import {
  type JsonResponse,
  mockResponse,
  SwapiListResponse,
} from "../interfaces/response.interface";
import { fakePeople, type People } from "../models/people.model";

/**
 * A mock implementation of {@link PeopleServicer}.
 *
 * Provides fake `People` data for testing, prototyping, or local development
 * without needing to call the real API. All methods simulate a 1.5 second delay
 * to mimic network latency.
 */
export class MockPeopleService implements PeopleServicer {
  private data: People[];

  /**
   * Create a new mock people service.
   *
   * @param seedData - An array of `People` objects to seed the mock service with.
   */
  public constructor(seedData: People[]) {
    this.data = seedData;
  }

  /**
   * Retrieve a single person by ID.
   *
   * @inheritdoc
   *
   * @throws Error If the ID is `"none"`, simulates a "Not found" error.
   */
  public async get(id: string): Promise<JsonResponse<People>> {
    console.debug("Get people is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (id === "none") {
      throw new Error("Not found");
    }
    return mockResponse(this.data[0]);
  }

  /**
   * Retrieve the full list of people.
   *
   * @inheritdoc
   */
  public async list(page: number): Promise<JsonResponse<SwapiListResponse<People>>> {
    console.debug("List people is called with params: ", page);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const data: SwapiListResponse<People> = {
      count: this.data.length,
      next: `/api/species/?page=${page + 1}`,
      previous: null,
      results: this.data,
    };
    return mockResponse(data);
  }

  /**
   * Search for people by keyword.
   *
   * @inheritdoc
   *
   * @remarks
   * If the keyword is `"none"`, simulates no search results and returns an empty array.
   */
  public async search(
    page: number,
    keyword: string
  ): Promise<JsonResponse<SwapiListResponse<People>>> {
    console.debug("Search people is called with params: ", page, keyword);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (keyword === "none") {
      return mockResponse({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });
    }
    const data: SwapiListResponse<People> = {
      count: this.data.length,
      next: `/api/species/?search=${keyword}&page=${page + 1}`,
      previous: null,
      results: this.data,
    };
    return mockResponse(data);
  }
}

/**
 * Default export of a mock people service seeded with fake people data.
 */
const mockPeopleService = new MockPeopleService(fakePeople);
export default mockPeopleService;
