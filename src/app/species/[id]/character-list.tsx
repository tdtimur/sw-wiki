"use client";

import { useEffect, useState } from "react";
import { getPeopleService } from "@/lib/services/people.service";
import { parseSwapiPath } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { People } from "@/lib/models/people.model";

/**
 * Displays a list of characters that belong to a species.
 *
 * @param props.ids - An array of SWAPI people IDs to fetch and display.
 *
 * @example
 * ```tsx
 * <CharacterList ids={["1", "2", "3"]} />
 * ```
 */
export default function CharacterList({ ids }: { ids: string[] }) {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      const peopleService = getPeopleService();
      try {
        const peoplePromises = ids
          .map((id) => parseSwapiPath(id)?.id ?? "")
          .map((id) => peopleService.get(id));
        const peopleResponses = await Promise.all(peoplePromises);
        const allOk = peopleResponses.every((response) => response.ok);
        if (!allOk) throw new Error("One or more people requests failed");

        const peopleData = await Promise.all(
          peopleResponses.map((response) => response.json())
        );
        setPeople(peopleData);
      } catch (err) {
        console.error("Error when fetching people:", err);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPeople();
  }, [ids]);

  if (loading) {
    return <CharacterListSkeleton count={ids.length || 3} />;
  }

  if (people.length === 0) {
    return <span>No character belongs to this species.</span>;
  }

  return (
    <ul className="my-2 list-disc pl-5">
      {people.map((person) => (
        <li key={person.url}>
          <Link
            href={`/characters/${parseSwapiPath(person.url)?.id}`}
            className="text-blue-600 flex items-center gap-1 hover:underline"
          >
            <UserIcon size={16} />
            <span>{person.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Skeleton placeholder for CharacterList while loading.
 *
 * @param props.count - Number of skeleton items to render
 */
export function CharacterListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="my-2 list-disc pl-5 space-y-2 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </li>
      ))}
    </ul>
  );
}
