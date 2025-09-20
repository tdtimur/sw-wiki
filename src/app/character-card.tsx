"use client";

import type { People } from "@/lib/models/people.model";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { capitalizeWords, cn, parseSwapiPath } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

/**
 * A card component that displays basic information about a Star Wars character.
 *
 * @remarks
 * Shows the character's name, gender, and birth year.
 * Includes a link to the character detail page if an ID can be parsed
 * from the SWAPI resource URL.
 *
 * @param props - Component props.
 * @param props.character - A `People` object containing the character's data.
 * @param props.className - Optional additional Tailwind CSS classes for styling.
 *
 * @example
 * ```tsx
 * <CharacterCard character={character} className="w-full" />
 * ```
 */
export default function CharacterCard({
  character,
  className = "",
}: {
  character: People;
  className?: string;
}) {
  const { name, birth_year, gender, url } = character;
  const { id: characterId } = parseSwapiPath(url) ?? { resource: "", id: "" };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <UserIcon />
            {capitalizeWords(gender)}
          </Badge>
        </CardDescription>
        {characterId !== "" && (
          <CardAction>
            <Link href={`/characters/${characterId}`}>
              <Button variant={"outline"} size={"sm"}>
                <span>View</span>
              </Button>
            </Link>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <p>Birth year: {birth_year}</p>
      </CardContent>
    </Card>
  );
}

export function CharacterCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-20 rounded-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-40" />
      </CardContent>
    </Card>
  );
}
