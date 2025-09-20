"use client";

import React, { useEffect, useState } from "react";
import { getFilmService } from "@/lib/services/film.service";
import { parseSwapiPath } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { Film } from "@/lib/models/film.model";

interface FilmListProps {
  ids: string[];
}

export default function FilmList({ ids }: FilmListProps) {
  const [films, setFilms] = useState<Film[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const filmService = getFilmService();
        const filmPromises = ids
          .map((id) => parseSwapiPath(id)?.id ?? "")
          .map((id) => filmService.get(id));

        const filmResponses = await Promise.all(filmPromises);
        const allOk = filmResponses.every((response) => response.ok);

        if (!allOk) {
          throw new Error("One or more film requests failed");
        }

        const data = await Promise.all(filmResponses.map((res) => res.json()));

        setFilms(data);
      } catch (err) {
        console.error("Error when fetching films:", err);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();
  }, [ids]);

  if (loading) return <FilmListSkeleton count={ids.length} />;

  if (!films || films.length === 0) {
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
}

// Skeleton for loading state
export function FilmListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="my-2 list-disc pl-5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <Skeleton className="h-4 w-32 mb-1" />
        </li>
      ))}
    </ul>
  );
}
