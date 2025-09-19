import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const loadingTexts = [
  "Trying to connect to the Force…",
  "Summoning midichlorians…",
  "Consulting the Jedi Archives…",
  "Calibrating hyperdrive…",
  "Hailing the Rebel Alliance…",
  "Searching the galaxy far, far away…",
  "Tuning into the Force frequencies…",
  "Contacting Master Yoda…",
  "Aligning the stars for destiny…",
  "Decrypting Imperial transmissions…",
  "Assembling your lightsaber…",
  "Dodging TIE Fighters…",
  "Negotiating with the Hutts…",
  "Opening a holocron of wisdom…",
];

export function getRandomLoadingText() {
  const index = Math.floor(Math.random() * loadingTexts.length);
  return loadingTexts[index];
}

const errorTexts = [
  "The Force is clouded… something went wrong.",
  "These are not the results you’re looking for.",
  "Connection lost — as if Alderaan had vanished.",
  "The Sith are interfering with the transmission.",
  "Hyperdrive malfunction! Please try again.",
  "Disturbance in the Force detected.",
  "Jedi mind trick failed — data could not be fetched.",
  "Your request was frozen in carbonite.",
  "Dark Side interference — error encountered.",
  "A protocol droid would say: 'This is a mistake!'",
  "Transmission jammed by the Empire.",
  "Womp rats chewed through the wires.",
  "Something went wrong, young Padawan.",
];

export function getRandomErrorText() {
  const index = Math.floor(Math.random() * errorTexts.length);
  return errorTexts[index];
}

export type ParsedSwapi = { resource: string; id: string };

/**
 * Parse a SWAPI-style path like "/api/people/7/"
 * to return { resource: "people", id: "7" }.
 * @param {string} path e.g. "/api/people/7/"
 * @returns {ParsedSwapi|null} Parsed resource
 */
export function parseSwapiPath(path: string): ParsedSwapi | null {
  // Remove leading/trailing slashes
  const parts = path
    .replace("https://swapi.dev", "")
    .split("/")
    .filter((part) => part !== "");

  // Expecting format: ["api", "<resource>", "<id>"]
  if (parts.length >= 3 && parts[0] === "api") {
    const resource = parts[1];
    const id = parts[2];
    return { resource, id };
  }

  return null;
}

/**
 * Capitalizes every input word's first letter.
 *
 * Example:
 *
 * console.log(capitalizeWords('luke skywalker'))
 * // "Luke Skywalker"
 *
 * @param {string} words
 * @returns {string}
 */
export function capitalizeWords(words: string): string {
  return words
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
