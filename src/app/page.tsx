"use client";

import { Separator } from "@radix-ui/react-separator";
import CharacterFinder from "./character-finder";
import SpeciesList from "./species-list";

export default function HomePage() {
  return (
    <>
      <CharacterFinder />
      <Separator className="my-10" />
      <SpeciesList />
    </>
  );
}
