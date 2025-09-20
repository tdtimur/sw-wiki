"use client";

import type { Species } from "@/lib/models/species.model";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CatIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { capitalizeWords, cn, parseSwapiPath } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * A card component that displays basic information about a species in Star Wars universe.
 *
 * @remarks
 * Shows the species' name and classification.
 * Includes a link to the species detail page if an ID can be parsed
 * from the SWAPI resource URL.
 *
 * @param props - Component props.
 * @param props.character - A `Species` object containing the species' data.
 * @param props.className - Optional additional Tailwind CSS classes for styling.
 *
 * @example
 * ```tsx
 * <SpeciesCard species={species} className="w-full" />
 * ```
 */
export default function SpeciesCard({
  species,
  className = "",
}: {
  species: Species;
  className?: string;
}) {
  const { name, classification, url } = species;
  const speciesId = parseSwapiPath(url)?.id ?? "";

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>
          <Badge variant="secondary" className="bg-emerald-200 text-black">
            <CatIcon />
            {capitalizeWords(classification)}
          </Badge>
        </CardDescription>
        {speciesId !== "" && (
          <CardAction>
            <Link href={`/species/${speciesId}`}>
              <Button
                onClick={() => toast.info("Loading species info...")}
                variant={"outline"}
                size={"sm"}
              >
                <span>View</span>
              </Button>
            </Link>
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
}

export function SpeciesCardSkeleton({ className = "" }: { className?: string }) {
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
    </Card>
  );
}
