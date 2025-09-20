import { getPeopleService } from "@/lib/services/people.service";
import { parseSwapiPath } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Displays a list of characters that belong to a species.
 *
 * @remarks
 * This is a **server component** that fetches people data for the given IDs
 * and renders them as a list.
 *
 * @param props - Component props.
 * @param props.ids - An array of SWAPI people IDs to fetch and display.
 *
 * @example
 * ```tsx
 * <CharacterList ids={["1", "2", "3"]} />
 * ```
 */
export default async function CharacterList({ ids }: { ids: string[] }) {
  const peopleService = getPeopleService();

  try {
    const peoplePromises = ids
      .map((id) => parseSwapiPath(id)?.id ?? "")
      .map((id) => peopleService.get(id));
    const peopleResponses = await Promise.all(peoplePromises);
    const allOk = peopleResponses.every((response) => response.ok);
    if (!allOk) {
      throw new Error("One or more people requests failed");
    }
    const people = await Promise.all(
      peopleResponses.map((response) => response.json())
    );

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
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error when fetching a film:", err);
    }
    notFound();
  }
}
