"use client";

import React, { useEffect, useState } from "react";
import type { People } from "@/lib/models/people.model";
import { getPeopleService } from "@/lib/services/people.service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, DnaIcon, FilmIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FilmList from "./film-list";
import SpeciesBadges from "./species-badges";
import { DetailItem } from "@/components/detail-item";
import { Skeleton } from "@/components/ui/skeleton";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const [character, setCharacter] = useState<People | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params);

  useEffect(() => {
    let mounted = true;

    async function fetchCharacter() {
      try {
        const peopleService = getPeopleService();
        const response = await peopleService.get(id);

        if (!mounted) return;

        if (response.status !== 200) {
          notFound();
          return;
        }

        const data = (await response.json()) as People;
        setCharacter(data);
      } catch (error) {
        console.error("Error when fetching a character:", error);
        notFound();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCharacter();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <CharacterPageSkeleton />;

  if (!character) return null; // fallback if notFound was called

  const {
    name,
    gender,
    birth_year,
    hair_color,
    eye_color,
    skin_color,
    height,
    mass,
    films,
    species,
  } = character;

  return (
    <Card className="mt-10">
      <CardHeader>
        <div className="flex item-center justify-between">
          <CardTitle className="text-lg md:text-xl self-center">
            <h4 className="text-sm">Viewing character:</h4>
            <h3 className="text-3xl md:text-4xl text-blue-600">{name}</h3>
          </CardTitle>
          <Link href={"/"}>
            <Button variant={"ghost"}>
              <ArrowLeftIcon />
              <span>Back</span>
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <DetailItem label="Birth Year" value={birth_year} />
          <DetailItem label="Gender" value={capitalizeWords(gender)} />
          <DetailItem label="Eye Color" value={capitalizeWords(eye_color)} />
          <DetailItem label="Hair Color" value={capitalizeWords(hair_color)} />
          <DetailItem label="Skin Color" value={capitalizeWords(skin_color)} />
          <DetailItem label="Height" value={`${height} cm`} />
          <DetailItem label="Mass" value={`${mass} kg`} />
        </div>

        <Separator className="my-4" />

        <div className="my-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <DnaIcon size={18} />
            Species
          </h3>
          <span className="text-xs italic mb-4">Click to view species</span>
          <SpeciesBadges ids={species} />
        </div>

        <div className="my-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FilmIcon size={18} />
            Film appearances
          </h3>
          <FilmList ids={films} />
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton component for loading state
export function CharacterPageSkeleton() {
  return (
    <Card className="mt-10 animate-pulse">
      <CardHeader>
        <div className="flex item-center justify-between">
          <CardTitle className="text-lg md:text-xl self-center">
            <Skeleton className="h-6 w-64" />
          </CardTitle>
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        <Separator className="my-4" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
      </CardContent>
    </Card>
  );
}
