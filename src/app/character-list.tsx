"use client";

import type { People } from "@/lib/models/people.model";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { getPeopleService } from "@/lib/services/people.service";
import { toast } from "sonner";
import { getRandomErrorText } from "@/lib/utils";
import CharacterCard from "./character-card";

export function CharacterList() {
  const peopleService = getPeopleService();
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [characters, setCharacters] = useState<People[]>([]);

  useEffect(() => {
    // Debounce the search by 500ms to
    // avoid calling the API on every keystroke.
    const debouncer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const responsePromise =
          keyword === "" ? peopleService.list() : peopleService.search(keyword);
        const response = await responsePromise;

        if (!response.ok) {
          toast.error(getRandomErrorText());
          toast.error(`Status: ${response.status}`);
          return;
        }

        const searchResults = await response.json();
        setCharacters(searchResults);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(getRandomErrorText());
          console.debug(error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(debouncer);
    };
  }, [keyword, peopleService]);

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Button className="hidden lg:flex" size="sm" variant="ghost" disabled>
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SearchIcon />
          )}
        </Button>
        <Input
          type="search"
          placeholder="Search keyword..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      <div className="flex items-start gap-3 mb-5">
        <span>Found {characters.length} people</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {characters.map((character) => (
          <CharacterCard
            key={character.url}
            character={character}
            className="min-w-full"
          />
        ))}
      </div>
    </>
  );
}
