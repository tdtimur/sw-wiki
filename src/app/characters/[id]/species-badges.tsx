"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getSpeciesService } from "@/lib/services/species.service";
import { DnaOffIcon } from "lucide-react";
import { parseSwapiPath } from "@/lib/utils";
import Link from "next/link";
import { Species } from "@/lib/models/species.model";

interface SpeciesBadgesProps {
  ids: string[];
}

export default function SpeciesBadges({ ids }: SpeciesBadgesProps) {
  const [specieses, setSpecieses] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const speciesService = getSpeciesService();
        const speciesPromises = ids
          .map((id) => parseSwapiPath(id)?.id ?? "")
          .map((id) => speciesService.get(id));
        const speciesResponses = await Promise.all(speciesPromises);
        const allOk = speciesResponses.every((res) => res.ok);
        if (!allOk) throw new Error("One or more species requests failed");

        const speciesData = await Promise.all(
          speciesResponses.map((res) => res.json())
        );
        setSpecieses(speciesData);
      } catch (err) {
        console.error("Error fetching species:", err);
        setSpecieses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [ids]);

  if (loading) {
    return <SpeciesBadgesSkeleton />;
  }

  if (specieses.length === 0) {
    return (
      <Badge variant="outline" className="my-2">
        <DnaOffIcon />
        Unknown
      </Badge>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {specieses.map((species) => (
        <Badge key={species.name} className="bg-emerald-200 text-black text-md">
          <Link href={`/species/${parseSwapiPath(species.url)?.id}`}>
            {species.name}
          </Link>
        </Badge>
      ))}
    </div>
  );
}

export function SpeciesBadgesSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 my-2">
      <Badge className="bg-gray-200 w-16 h-6 rounded-md animate-pulse" />
      <Badge className="bg-gray-200 w-20 h-6 rounded-md animate-pulse" />
      <Badge className="bg-gray-200 w-14 h-6 rounded-md animate-pulse" />
    </div>
  );
}
