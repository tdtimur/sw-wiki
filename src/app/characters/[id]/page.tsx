import type { People } from "@/lib/models/people.model";
import { getPeopleService } from "@/lib/services/people.service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeWords } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, DnaIcon, FilmIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FilmBadges from "./film-badges";
import SpeciesBadges from "./species-badges";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const peopleService = getPeopleService();

  try {
    const characterResponse = await peopleService.get(id);

    if (characterResponse.status !== 200) {
      notFound();
    }

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
    } = (await characterResponse.json()) as People;

    return (
      <Card className="mt-10">
        <CardHeader>
          <div className="flex item-center justify-between">
            <CardTitle className="text-lg md:text-xl self-center">
              Character:{" "}
              <span className="text-lg md:text-3xl text-blue-600">{name}</span>
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
            <DetailItem
              label="Hair Color"
              value={capitalizeWords(hair_color)}
            />
            <DetailItem
              label="Skin Color"
              value={capitalizeWords(skin_color)}
            />
            <DetailItem label="Height" value={`${height} cm`} />
            <DetailItem label="Mass" value={`${mass} kg`} />
          </div>
          <Separator className="my-4" />
          <div className="my-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <DnaIcon size={18} />
              Species
            </h3>
            <SpeciesBadges ids={species} />
          </div>
          <div className="my-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FilmIcon size={18} />
              Film appearances
            </h3>
            <FilmBadges ids={films} />
          </div>
        </CardContent>
      </Card>
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error when fetching a character:", err);
    }
    notFound();
  }
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2 flex gap-2">
      <div className="flex-auto max-w-[40%] text-lg font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="flex-auto text-lg col-span-2 text-gray-900 dark:text-gray-100">
        {value || "—"}
      </div>
    </div>
  );
}
