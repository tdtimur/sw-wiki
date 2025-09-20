"use client";

import { useEffect, useState } from "react";
import { getSpeciesService } from "@/lib/services/species.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { capitalizeWords, getRandomErrorText } from "@/lib/utils";
import { DetailItem } from "@/components/detail-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CharacterList from "./character-list";
import type { Species } from "@/lib/models/species.model";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { toast } from "sonner";
import ErrorCard from "@/components/error-card";

interface SpeciesPageProps {
  params: Promise<{ id: string }>;
}

export default function SpeciesPage({ params }: SpeciesPageProps) {
  const { id } = React.use(params);
  const [species, setSpecies] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const speciesService = getSpeciesService();
        const response = await speciesService.get(id);
        if (!response.ok) {
          toast.error(`Failed to load species data. ${getRandomErrorText()}`);
          return;
        }
        const data = await response.json();
        setSpecies(data);
      } catch (err) {
        console.error("Error fetching species:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [id]);

  if (loading) {
    return <SpeciesPageSkeleton />;
  }

  if (!species) {
    return <ErrorCard title="Failed to load species" message={getRandomErrorText()} />;
  }

  const {
    name,
    classification,
    designation,
    average_height,
    average_lifespan,
    eye_colors,
    hair_colors,
    skin_colors,
    language,
    people,
  } = species;

  return (
    <Card className="mt-10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl self-center">
            <h4 className="text-sm">Viewing species:</h4>
            <h3 className="text-3xl md:text-4xl text-emerald-600">{name}</h3>
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
          <DetailItem
            label="Classification"
            value={capitalizeWords(classification.replaceAll("n/a", "-"))}
          />
          <DetailItem
            label="Designation"
            value={capitalizeWords(designation.replaceAll("n/a", "-"))}
          />
          <DetailItem
            label="Average Height"
            value={`${average_height.replaceAll("n/a", "-")} cm`}
          />
          <DetailItem
            label="Average Lifespan"
            value={`${average_lifespan.replaceAll("n/a", "-")} years`}
          />
          <DetailItem
            label="Eye Colors"
            value={capitalizeWords(eye_colors.replaceAll("n/a", "-"))}
          />
          <DetailItem
            label="Hair Colors"
            value={capitalizeWords(hair_colors.replaceAll("n/a", "-"))}
          />
          <DetailItem
            label="Skin Colors"
            value={capitalizeWords(skin_colors.replaceAll("n/a", "-"))}
          />
          <DetailItem label="Languages" value={language.replaceAll("n/a", "-")} />
        </div>
        <Separator className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <UsersIcon size={18} />
            Characters
          </h3>
          <CharacterList ids={people} />
        </div>
      </CardContent>
    </Card>
  );
}

function SpeciesPageSkeleton() {
  return (
    <Card className="mt-10 animate-pulse">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl self-center">
            <Skeleton className="h-8 w-48" />
          </CardTitle>
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Separator className="my-4" />
        <div className="my-4 space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
