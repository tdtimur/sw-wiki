import { getFilmService } from "@/lib/services/film.service";
import { notFound } from "next/navigation";

// Displays films as a list of badge components.
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
