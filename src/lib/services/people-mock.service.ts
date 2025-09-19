import type { PeopleServicer } from "../interfaces/people.interface";
import { JsonResponse, mockResponse } from "../interfaces/response.interface";
import { fakePeople, People } from "../models/people.model";

export class MockPeopleService implements PeopleServicer {
  private data: People[];

  public constructor(seedData: People[]) {
    this.data = seedData;
  }

  public async get(id: string): Promise<JsonResponse<People>> {
    // Simulate a 1.5-second delay
    console.debug("Get people is called with params: ", id);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data[0]);
  }

  public async list(): Promise<JsonResponse<People[]>> {
    // Simulate a 1.5-second delay
    console.debug("List people is called");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return mockResponse(this.data);
  }

  public async search(keyword: string): Promise<JsonResponse<People[]>> {
    // Simulate a 1.5-second delay
    console.debug("Search people is called with params: ", keyword);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (keyword === "none") {
      return mockResponse([]);
    }
    return mockResponse(this.data);
  }
}

const mockPeopleService = new MockPeopleService(fakePeople);
export default mockPeopleService;
