"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import Link from "next/link";
import { toast } from "sonner";
import { getRandomErrorText, parseSwapiPath } from "@/lib/utils";
import { ChevronRightIcon, Loader2Icon, UserIcon } from "lucide-react";
import { getPeopleService } from "@/lib/services/people.service";
import type { People } from "@/lib/models/people.model";
import { Skeleton } from "./ui/skeleton";
import { useIsMobile } from "@/lib/hooks/isMobile";
import { Button } from "./ui/button";

export function CharacterSearch() {
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const peopleService = getPeopleService();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [characters, setCharacters] = useState<People[]>([]);
  const ref = useRef<HTMLDivElement>(null);

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
    if (keyword === "") {
      setCharacters([]);
      setOpen(false);
      return;
    }

    setIsLoading(true);
    setOpen(true);
    const debouncer = setTimeout(async () => {
      // setError(undefined);
      try {
        const response =
          keyword === ""
            ? await peopleService.list(page)
            : await peopleService.search(page, keyword);

        if (!response.ok) {
          toast.error(getRandomErrorText());
          toast.error(`Status: ${response.status}`);
          return;
        }

        const searchResults = await response.json();
        setHasMore(searchResults.next !== null && searchResults.next !== "");
        setTotal(searchResults.count);

        setCharacters((previous) => [
          ...(page === 1 ? [] : previous),
          ...searchResults.results,
        ]);

        // only open dropdown if there are results
        setOpen(true);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(getRandomErrorText());
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(debouncer);
  }, [peopleService, page, keyword]);

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <Input
        type="search"
        placeholder="Search character by name..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => {
          if (characters.length > 0) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      />

      {open && (
        <div className="absolute mt-2 w-full rounded-md border bg-popover shadow-md z-50">
          <Command>
            <CommandGroup
              heading={total > 0 ? `Found ${total} matches` : ""}
              className="p-2 max-h-[75vh] overflow-y-auto"
            >
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <CommandItem key={i}>
                    <Skeleton className="h-6 w-full mb-2" />
                  </CommandItem>
                ))
              ) : characters.length > 0 ? (
                characters.map(({ name, url }) => {
                  const id = parseSwapiPath(url)?.id ?? "";
                  return (
                    <CommandItem key={id} asChild onSelect={() => setOpen(false)}>
                      <Link
                        href={`/characters/${id}`}
                        className="flex gap-2 cursor-pointer"
                      >
                        <UserIcon className="h-4 w-4" />
                        {name}
                      </Link>
                    </CommandItem>
                  );
                })
              ) : (
                <CommandItem disabled>No results found</CommandItem>
              )}
              {hasMore && (
                <div className="flex items-center justify-center">
                  {" "}
                  <Button
                    ref={loadMoreRef}
                    variant="outline"
                    onClick={() => !isMobile && setPage(page + 1)}
                    className="my-3 mx-6"
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
                </div>
              )}
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  );
}
