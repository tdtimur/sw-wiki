import { getFilmService } from "@/lib/services/film.service";
import { notFound } from "next/navigation";

/**
 * Displays a list of films as badges.
 *
 * @remarks
 * This is a **server component** that fetches film data for the given IDs
 * and renders them as a list of badge components.
 *
 * @param props - Component props.
 * @param props.ids - An array of SWAPI film IDs to fetch and display.
 *
 * @example
 * ```tsx
 * <FilmBadges ids={["1", "2", "3"]} />
 * ```
 */
export default async function FilmBadges({ ids }: { ids: string[] }) {
  const filmService = getFilmService();

  try {
    const filmPromises = ids.map((id) => filmService.get(id));
    const filmResponses = await Promise.all(filmPromises);
    const allOk = filmResponses.every((response) => response.ok);
    if (!allOk) {
      throw new Error("One or more film requests failed");
    }
    const films = await Promise.all(
      filmResponses.map((response) => response.json()),
    );

    if (films.length === 0) {
      return <span>Never appeared in any movie</span>;
    }

    return (
      <ul className="my-2 list-disc pl-5">
        {films.map((film) => (
          <li key={film.episode_id}>
            {film.title} ({new Date(film.release_date).getFullYear()})
          </li>
        ))}
      </ul>
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error when fetching a film:", err);
    }
    notFound();
  }
}
