import { Film } from "../models/film.model";
import { JsonResponse } from "./response.interface";

export interface FilmGetter {
  get(id: string): Promise<JsonResponse<Film>>;
}
