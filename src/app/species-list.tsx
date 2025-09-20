"use client";

import type { Species } from "@/lib/models/species.model";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { getRandomErrorText, getRandomLoadingText } from "@/lib/utils";
import SpeciesCard, { SpeciesCardSkeleton } from "./species-card";
import { getSpeciesService } from "@/lib/services/species.service";

export default function SpeciesList() {
  const speciesService = getSpeciesService();
  const [isLoading, setIsLoading] = useState(true);
  const [specieses, setSpecieses] = useState<Species[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      setSpecieses([]);
      try {
        const response = await speciesService.list();

        if (!response.ok) {
          toast.error(getRandomErrorText());
          toast.error(`Status: ${response.status}`);
          return;
        }

        const results = await response.json();
        setSpecieses(results);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(getRandomErrorText());
          console.debug(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecies();
  }, [speciesService]);

  return (
    <div className="my-10">
      <h1 className="text-2xl text-bold my-4">Or, find characters by their species</h1>
      <div className="flex items-start gap-3 mb-5">
        {isLoading ? (
          <div className="flex items-center gap-3">
            {" "}
            <Loader2Icon className="animate-spin" />
            <span>{getRandomLoadingText()}</span>
          </div>
        ) : specieses.length === 0 ? (
          <span>Something wrong with the Jedi archive, could not find anyone.</span>
        ) : (
          <span>Found {specieses.length} species.</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <SpeciesCardSkeleton key={i} className="min-w-full" />
          ))
        ) : specieses.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500 text-lg dark:text-gray-400">
            🚫 There is a great disturbance in The Force.
          </div>
        ) : (
          specieses.map((species) => (
            <SpeciesCard key={species.url} species={species} className="min-w-full" />
          ))
        )}
      </div>
    </div>
  );
}
