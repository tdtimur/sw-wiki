"use client";

import getConfig from "@/lib/config";
import Link from "next/link";

/**
 * The main site header component.
 *
 * @remarks
 * Renders the top navigation bar of the Star Wars Wiki application.
 * Typically includes the site title, navigation links, and context-specific
 * items (e.g., back-to-home link when viewing a character page).
 *
 * @returns A React element representing the site header.
 *
 * @example
 * ```tsx
 * <SiteHeader />
 * ```
 */
export function SiteHeader() {
  const config = getConfig();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 py-1 backdrop-blur shadow-sm">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex justify-between h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-foreground font-bold">SW Wiki</span>
          </Link>
          <span className="text-foreground text-xs self-center">{config.version}</span>
        </div>
      </div>
    </header>
  );
}
