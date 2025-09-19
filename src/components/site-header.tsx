"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground font-bold">SW Wiki</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
