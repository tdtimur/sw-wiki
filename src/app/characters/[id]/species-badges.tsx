import { Badge } from "@/components/ui/badge";
import { getSpeciesService } from "@/lib/services/species.service";
import { notFound } from "next/navigation";
import { DnaOffIcon } from "lucide-react";
import { parseSwapiPath } from "@/lib/utils";
import Link from "next/link";

/**
 * Displays a list of species as badge components.
 *
 * @remarks
 * This is a **server component** that fetches species data for the given IDs
 * and renders them as badge UI elements.
 *
 * @param props - Component props.
 * @param props.ids - An array of SWAPI species IDs to fetch and display.
 *
 * @example
 * ```tsx
 * <SpeciesBadges ids={["1", "2", "3"]} />
 * ```
 */
export default async function SpeciesBadges({ ids }: { ids: string[] }) {
  const speciesService = getSpeciesService();

  try {
    const speciesPromises = ids
      .map((id) => parseSwapiPath(id)?.id ?? "")
      .map((id) => speciesService.get(id));
    const speciesResponses = await Promise.all(speciesPromises);
    const allOk = speciesResponses.every((response) => response.ok);
    if (!allOk) {
      throw new Error("One or more species requests failed");
    }
    const specieses = await Promise.all(
      speciesResponses.map((response) => response.json())
    );

    if (specieses.length === 0) {
      return (
        <Badge variant={"outline"} className="my-2">
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
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error when fetching a species:", err);
    }
    notFound();
  }
}
