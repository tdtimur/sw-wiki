/**
 * Represents Star Wars species.
 */
export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string[];
  homeworld: string[];
  people: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
};

/**
 * Arrays of fake data of type `Species`.
 */
export const fakeSpecies: Species[] = [
  {
    name: "Zyphorian",
    classification: "mammal",
    designation: "sentient",
    average_height: "210",
    average_lifespan: "120",
    eye_colors: "amber, green",
    hair_colors: "black, silver",
    skin_colors: "gray, pale blue",
    language: ["Zyphorian", "Galactic Basic"],
    homeworld: ["/api/planets/12/"],
    people: ["/api/people/45/", "/api/people/46/"],
    films: ["/api/films/1/", "/api/films/3/"],
    url: "/api/species/100/",
    created: "2025-09-19T12:00:00.000Z",
    edited: "2025-09-19T12:00:00.000Z",
  },
  {
    name: "Krellith",
    classification: "reptile",
    designation: "sentient",
    average_height: "170",
    average_lifespan: "80",
    eye_colors: "yellow, orange, black",
    hair_colors: "none",
    skin_colors: "green, dark brown, sand",
    language: ["Krellith hiss", "Galactic Basic"],
    homeworld: ["/planets/9/"],
    people: ["/api/people/77/"],
    films: ["/api/films/2/"],
    url: "/api/species/101/",
    created: "2025-09-19T12:00:00.000Z",
    edited: "2025-09-19T12:00:00.000Z",
  },
  {
    name: "Aurelian",
    classification: "avian",
    designation: "sentient",
    average_height: "150",
    average_lifespan: "200",
    eye_colors: "blue, violet",
    hair_colors: "feathered: white, gold",
    skin_colors: "light tan, bronze",
    language: ["Aurelian song-speech"],
    homeworld: ["/api/planets/15/"],
    people: [],
    films: ["/api/films/4/", "/api/films/5/"],
    url: "/api/species/102/",
    created: "2025-09-19T12:00:00.000Z",
    edited: "2025-09-19T12:00:00.000Z",
  },
  {
    name: "Drogan",
    classification: "amphibian",
    designation: "sentient",
    average_height: "130",
    average_lifespan: "60",
    eye_colors: "black, red",
    hair_colors: "none",
    skin_colors: "blue, turquoise, gray",
    language: ["Clickspeak"],
    homeworld: ["/api/planets/22/"],
    people: ["/api/people/88/", "/api/people/89/"],
    films: ["/api/films/6/"],
    url: "/api/species/103/",
    created: "2025-09-19T12:00:00.000Z",
    edited: "2025-09-19T12:00:00.000Z",
  },
  {
    name: "Velari",
    classification: "insectoid",
    designation: "sentient",
    average_height: "190",
    average_lifespan: "50",
    eye_colors: "compound: green, violet",
    hair_colors: "none",
    skin_colors: "chitin: black, bronze",
    language: ["Velari clicks"],
    homeworld: ["/api/planets/30/"],
    people: ["/api/people/99/"],
    films: ["/api/films/7/"],
    url: "/api/species/104/",
    created: "2025-09-19T12:00:00.000Z",
    edited: "2025-09-19T12:00:00.000Z",
  },
];
