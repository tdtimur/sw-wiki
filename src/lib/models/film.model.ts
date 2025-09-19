/**
 * Represents a Star Wars film.
 */
export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: string;
  edited: string;
};

/**
 * Arrays of fake data of type `Film`.
 */
export const fakeFilms: Film[] = [
  {
    title: "Shadows of the Old Republic",
    episode_id: 10,
    opening_crawl:
      "Turmoil spreads across the Outer Rim. As smugglers and bounty hunters profit from chaos, a small band of Jedi Knights attempt to restore balance. But whispers of a new Sith Lord echo through the galaxy...",
    director: "Ava Renlor",
    producer: "Lira Voss",
    release_date: "2027-05-04",
    species: ["/api/species/1/", "/api/species/5/"],
    starships: ["/api/starships/2/", "/api/starships/9/"],
    vehicles: ["/api/vehicles/4/"],
    characters: ["/api/people/1/", "/api/people/7/", "/api/people/12/"],
    planets: ["/api/planets/2/", "/api/planets/4/"],
    url: "/api/films/10/",
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
  {
    title: "Rise of the Mandalore",
    episode_id: 11,
    opening_crawl:
      "The Mandalorian clans, long divided, unite under a mysterious leader. As the Republic struggles to respond, rumors spread that the Dark Saber has returned, igniting conflict across the stars.",
    director: "Kael Thorne",
    producer: "Dax Morin",
    release_date: "2029-12-18",
    species: ["/api/species/2/", "/api/species/6/"],
    starships: ["/api/starships/5/", "/api/starships/10/"],
    vehicles: ["/api/vehicles/8/", "/api/vehicles/14/"],
    characters: ["/api/people/3/", "/api/people/9/"],
    planets: ["/api/planets/6/", "/api/planets/8/", "/api/planets/10/"],
    url: "/api/films/11/",
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
  {
    title: "The Lost Holocron",
    episode_id: 12,
    opening_crawl:
      "A lost Jedi Holocron surfaces in the Unknown Regions. Whoever controls its secrets may alter the fate of the galaxy. Both the Sith and the Jedi race to claim it first.",
    director: "Sera Korrin",
    producer: "Bren Orlan",
    release_date: "2031-06-15",
    species: ["/api/species/4/"],
    starships: ["/api/starships/3/", "/api/starships/12/"],
    vehicles: [],
    characters: ["/api/people/2/", "/api/people/11/"],
    planets: ["/api/planets/1/", "/api/planets/12/"],
    url: "/api/films/12/",
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
  },
];
