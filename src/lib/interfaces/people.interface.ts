import type { People } from "../models/people.model";
import type { JsonResponse } from "./response.interface";

export interface PeopleLister {
  list(): Promise<JsonResponse<People[]>>;
}

export interface PeopleSearcher {
  search(keyword: string): Promise<JsonResponse<People[]>>;
}

export interface PeopleGetter {
  get(id: string): Promise<JsonResponse<People>>;
}

export interface PeopleServicer
  extends PeopleGetter,
    PeopleLister,
    PeopleSearcher {}
