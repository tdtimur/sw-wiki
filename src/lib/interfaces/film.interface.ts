import type { Film } from "../models/film.model";
import type { JsonResponse } from "./response.interface";

export interface FilmGetter {
  get(id: string): Promise<JsonResponse<Film>>;
}
