import { getSpeciesService } from "@/lib/services/species.service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { capitalizeWords } from "@/lib/utils";
import { DetailItem } from "@/components/detail-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CharacterList from "./character-list";

interface SpeciesPageProps {
  params: Promise<{ id: string }>;
}

export default async function SpeciesPage({ params }: SpeciesPageProps) {
  const { id } = await params;
  const speciesService = getSpeciesService();

  try {
    const speciesResponse = await speciesService.get(id);
    if (speciesResponse.status !== 200) {
      notFound();
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
    } = await speciesResponse.json();

    return (
      <Card className="mt-10">
        <CardHeader>
          <div className="flex item-center justify-between">
            <CardTitle className="text-lg md:text-xl self-center">
              Species: <span className="text-lg md:text-3xl text-blue-600">{name}</span>
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
            <DetailItem label="Name" value={name} />
            <DetailItem
              label="Classification"
              value={capitalizeWords(classification)}
            />
            <DetailItem label="Designation" value={capitalizeWords(designation)} />
            <DetailItem label="Average Height" value={`${average_height} cm`} />
            <DetailItem label="Average Lifespan" value={`${average_lifespan} years`} />
            <DetailItem label="Eye Colors" value={capitalizeWords(eye_colors)} />
            <DetailItem label="Hair Colors" value={capitalizeWords(hair_colors)} />
            <DetailItem label="Skin Colors" value={capitalizeWords(skin_colors)} />
            <DetailItem label="Languages" value={language.join(", ")} />
          </div>
          <Separator className="my-4" />
          <div className="my-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <UsersIcon size={18} />
              Characters in this species
            </h3>
            <CharacterList ids={people} />
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error when fetching a character:", error);
    }
    notFound();
  }
}
