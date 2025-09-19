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
            <Link
              className="text-md underline text-blue-600"
              href={`/characters/${characterId}`}
            >
              View
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
