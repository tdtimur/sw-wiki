"use client";

import type { People } from "@/lib/models/people.model";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { getPeopleService } from "@/lib/services/people.service";
import { toast } from "sonner";
import { getRandomErrorText } from "@/lib/utils";
import CharacterCard, { CharacterCardSkeleton } from "./character-card";
import { useIsMobile } from "@/lib/hooks/isMobile";

export default function CharacterFinder() {
  const peopleService = getPeopleService();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [characters, setCharacters] = useState<People[]>([]);
  const [error, setError] = useState<Error | undefined>();

  const loadMoreRef = useRef<HTMLButtonElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // intersection observer for infinite scroll (mobile only)
    if (!isMobile || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isMobile, hasMore, isLoading]);

  useEffect(() => {
    if (keyword !== "") {
      setCharacters([]);
      if (page !== 1) setPage(1);
    }

    const debouncer = setTimeout(async () => {
      setIsLoading(true);
      setError(undefined);
      try {
        const response =
          keyword === ""
            ? await peopleService.list(page)
            : await peopleService.search(page, keyword);

        if (!response.ok) {
          toast.error(getRandomErrorText());
          toast.error(`Status: ${response.status}`);
          setError(new Error(`Status: ${response.status}`));
          return;
        }

        const searchResults = await response.json();
        setHasMore(searchResults.next !== null && searchResults.next !== "");
        setTotal(searchResults.count);

        // append new results
        setCharacters((previous) => [
          ...(page === 1 ? [] : previous),
          ...searchResults.results,
        ]);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(getRandomErrorText());
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(debouncer);
  }, [peopleService, page, keyword]);

  return (
    <>
      <h1 className="text-2xl text-bold my-4">
        Find your character by looking into The Force...
      </h1>
      <div className="flex items-center gap-2 mb-3">
        <Button className="hidden lg:flex" size="sm" variant="ghost" disabled>
          <SearchIcon />
        </Button>
        <Input
          type="search"
          placeholder="Search keyword..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      <div className="flex items-start gap-3 mb-5">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Loader2Icon className="animate-spin" />
            <span>Connecting with The Force...</span>
          </div>
        ) : characters.length === 0 ? (
          <span>Could not find anyone.</span>
        ) : (
          <span>Found {total} characters.</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {error !== undefined ? (
          <div className="col-span-full text-center py-8 text-gray-500 text-lg dark:text-gray-400">
            🚫 There is a great disturbance in The Force.
          </div>
        ) : (
          characters.map((character) => (
            <CharacterCard
              key={character.url}
              character={character}
              className="min-w-full"
            />
          ))
        )}

        {isLoading &&
          [...Array(4)].map((_, i) => (
            <CharacterCardSkeleton key={i} className="min-w-full" />
          ))}

        {hasMore && (
          <Button
            ref={loadMoreRef}
            variant="outline"
            onClick={() => !isMobile && setPage(page + 1)}
          >
            {isLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Loading
              </>
            ) : (
              <>
                <ChevronRightIcon />
                {isMobile ? "Scroll to load more" : "Load more"}
              </>
            )}
          </Button>
        )}
      </div>
    </>
  );
}
